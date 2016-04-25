export class bsonObjectId {
    
    machineId = parseInt(Math.random() * 0xFFFFFF, 10);
    pid = Math.floor(Math.random() * 100000);
    index = parseInt(Math.random() * 0xFFFFFF, 10);

    getObjectId() {
        var time = Date.now()/1000;
        time = parseInt(time, 10) % 0xFFFFFFFF;
        return this.hex(8, time) + this.hex(6, this.machineId) + this.hex(4, this.pid) + this.hex(6, this.next());
    }

    hex(length, n) {
        n = n.toString(16);
        return (n.length===length)? n : "00000000".substring(n.length, length) + n; 
    }

    next() {
        this.index += 1;
        return (this.index) % 0xFFFFFF;
    }
}