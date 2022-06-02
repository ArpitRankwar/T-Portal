// Require google from googleapis package.
const { google } = require('googleapis')

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  '298212197539-ctuloh353uou9qhb4q0np87d2n9i1083.apps.googleusercontent.com',
  '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'
)

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
  refresh_token: '1//04ydLtS-SvURyCgYIARAAGAQSNwF-L9IrOZNcSLFkILyVywOwGMf9mfnyEYNQJM2qNnZeLIDqn0LlHgVAsVoarTuA4uPVllAAQLU',
})

// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
var eventStartTime='2022-05-05T16:30:00+05:30';
var eventEndTime='2022-05-05T17:00:00+05:30';

// Create a dummy event for temp uses in our calendar
const event = {
  summary: `Academic Consultation-Wiingy`,
  location: `Online/Gmeet`,
  description: `Thank you for contacting us and scheduling an academic consultation with one of our advisors. On the call, our advisor will listen to your needs and requirements and will advise you on how Wiingy can best support and enable your child through our enriching curriculum. During the call, please feel free to ask any questions or express any concerns you may have.

  Please join the google meet link at the scheduled time. We look forward to speaking with you soon. 
  
  Regards,
  Team Wiingy`,
  colorId: 10,
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Los_Angeles'
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Los_Angeles'
  },
  conferenceData: {
    createRequest: {requestId: "7qxalsvy0e"}
  },
  attendees: [
    {email: 'keerthana@wiingy.com'}
  ],
}

// Check if we a busy and have an event on our calendar for the same time.
calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Denver',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    // Check for errors in our query and log them if they exist.
    if (err) return console.error('Free Busy Query Error: ', err)

    // Create an array of all events on our calendar during that time.
    const eventArr = res.data.calendars.primary.busy
      // If we are not busy create a new calendar event.
      return calendar.events.insert(
        { calendarId: 'primary', resource: event,
        sendNotifications: true,
        conferenceDataVersion: 1 },
        
        (err,result) => {
          // Check for errors and log them if they exist.
          if (err) return console.error('Error Creating Calender Event:', err)
          // Else log that the event was created.
          return console.log({result:result, message:"successful"})
        }
      )
  }
)
