<div class="meeting-list" style="display:inline-block; vertical-align:middle; height: 100%; background-color: lightgrey; padding: 20px 20px 20px 20px;">
        <div>
            <div style="display:inline-block; vertical-align:middle;"><button type="button" click.delegate="addMeeting()">+</button></div>
            <div style="display:inline-block; vertical-align:middle;"><h1>Meetings</h1></div>
        </div>
        <div repeat.for="item of meetinglist">
            <label>${item.date}</label>
            <a click.delegate="getMeetingItems(item)" href="javascript:void(0)">${item.name}</a>
       </div>
  	</div>
    <div style="display:inline-block; vertical-align:top; padding: 20px 20px 20px;">
        <form submit.delegate="savemeetingdetail()">
            <div>
                <div style="display:inline-block; vertical-align:middle;"><label>Meeting:</label></div>
                <div style="display:inline-block; vertical-align:middle;"><input type="text" value.bind="meetingdetail.name" style="width: 400px"></div>
            </div>
            <div>
                <div style="display:inline-block; vertical-align:middle;"><label>Date:</label></div>
                <div style="display:inline-block; vertical-align:middle;"><input type="text" value.bind="meetingdetail.date" style="width: 400px"></div>
            </div>
        </form>
        <div repeat.for="item of meetingitemlist">
            <label>${item.comment}</label>
       </div>
    </div>