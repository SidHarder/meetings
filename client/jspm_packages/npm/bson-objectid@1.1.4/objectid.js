/* */ 
(function(Buffer, process) {
  var MACHINE_ID = parseInt(Math.random() * 0xFFFFFF, 10);
  var index = ObjectID.index = parseInt(Math.random() * 0xFFFFFF, 10);
  var pid = typeof process === 'undefined' || (typeof process.pid !== 'number' ? Math.floor(Math.random() * 100000) : process.pid) % 0xFFFF;
  var isBuffer = function(obj) {
    return !!(obj != null && obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj));
  };
  function ObjectID(arg) {
    if (!(this instanceof ObjectID))
      return new ObjectID(arg);
    if (arg && ((arg instanceof ObjectID) || arg._bsontype === "ObjectID"))
      return arg;
    var buf;
    if (isBuffer(arg) || (Array.isArray(arg) && arg.length === 12)) {
      buf = Array.prototype.slice.call(arg);
    } else if (typeof arg === "string") {
      if (arg.length !== 12 && !ObjectID.isValid(arg))
        throw new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
      buf = buffer(arg);
    } else if (/number|undefined/.test(typeof arg)) {
      buf = buffer(generate(arg));
    }
    Object.defineProperty(this, "id", {
      enumerable: true,
      get: function() {
        return String.fromCharCode.apply(this, buf);
      }
    });
    Object.defineProperty(this, "str", {get: function() {
        return buf.map(hex.bind(this, 2)).join('');
      }});
  }
  module.exports = ObjectID;
  ObjectID.generate = generate;
  ObjectID.createFromTime = function(time) {
    time = parseInt(time, 10) % 0xFFFFFFFF;
    return new ObjectID(hex(8, time) + "0000000000000000");
  };
  ObjectID.createFromHexString = function(hexString) {
    if (!ObjectID.isValid(hexString))
      throw new Error("Invalid ObjectID hex string");
    return new ObjectID(hexString);
  };
  ObjectID.isValid = function(objectid) {
    if (!objectid)
      return false;
    return /^[0-9A-F]{24}$/i.test(objectid.toString());
  };
  ObjectID.prototype = {
    _bsontype: 'ObjectID',
    constructor: ObjectID,
    toHexString: function() {
      return this.str;
    },
    equals: function(other) {
      return !!other && this.str === other.toString();
    },
    getTimestamp: function() {
      return new Date(parseInt(this.str.substr(0, 8), 16) * 1000);
    }
  };
  function next() {
    return index = (index + 1) % 0xFFFFFF;
  }
  function generate(time) {
    if (typeof time !== 'number')
      time = Date.now() / 1000;
    time = parseInt(time, 10) % 0xFFFFFFFF;
    return hex(8, time) + hex(6, MACHINE_ID) + hex(4, pid) + hex(6, next());
  }
  function hex(length, n) {
    n = n.toString(16);
    return (n.length === length) ? n : "00000000".substring(n.length, length) + n;
  }
  function buffer(str) {
    var i = 0,
        out = [];
    if (str.length === 24)
      for (; i < 24; out.push(parseInt(str[i] + str[i + 1], 16)), i += 2)
        ;
    else if (str.length === 12)
      for (; i < 12; out.push(str.charCodeAt(i)), i++)
        ;
    return out;
  }
  ObjectID.prototype.inspect = function() {
    return "ObjectID(" + this + ")";
  };
  ObjectID.prototype.toJSON = ObjectID.prototype.toHexString;
  ObjectID.prototype.toString = ObjectID.prototype.toHexString;
})(require('buffer').Buffer, require('process'));
