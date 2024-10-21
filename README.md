# Outlook Office 365 ICS Proxy for Google Calendar
This is a simple proxy server that converts the timezone of an ICS file from Outlook/Office 365 to the IANA timezone format which is compatible with Google Calendar.

This Project addresses the issue where events imported from an Outlook/Office 365 ICS feed are bind to the wrong timezone in Google Calendar.

## How it works
The proxy server receives an ICS file from Outlook/Office 365, converts the timezone to the IANA timezone format, and returns the updated ICS file to the client.
The conversion is done by parsing the ICS file and replacing the timezone with the IANA timezone format.

## Usage
1. Deploy the proxy server to a cloudflare worker.
2. Get the Outlook/Office 365 ICS feed URL like `https://outlook.office365.com/owa/calendar/00000000-0000-0000-0000-000000000000/00000000-0000-0000-0000-000000000000/calendar.ics`.
3. Replace the domain part of the URL with the cloudflare worker URL like `https://outlook-ics-proxy.example.workers.dev/owa/calendar/00000000-0000-0000-0000-000000000000/00000000-0000-0000-0000-000000000000/calendar.ics`.
4. Import the updated ICS feed URL to Google Calendar.
5. The events should now be displayed in the correct timezone.

## Requirements:
- [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)
- [Cloudflare Account](https://dash.cloudflare.com/sign-up/workers)
- [Google Calendar Account](https://calendar.google.com/)
- [Outlook/Office 365 Account](https://outlook.office.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [go](https://golang.org/)

## Technologies:
This project intends to show how to compile and deploy a Go application to Cloudflare Workers using WebAssembly (wasm).
Knowing Go and WebAssembly makes not necessary sense to use for this kind of problem, but it is a good opportunity to learn how to integrate these technologies.

## Related Issues:
- https://support.google.com/calendar/thread/253308528/events-imported-from-outlook-ics-feed-show-wrong-time-zone?hl=en
- https://answers.microsoft.com/en-us/outlook_com/forum/all/published-outlook-calendar-ics-link-shows-wrong/5de6c55d-9c46-4e67-ab6a-27873d1bf636
- https://answers.microsoft.com/en-us/outlook_com/forum/all/a-shared-outlook-calendar-shows-wrong-timezone-in/3f105a74-3dc0-4c20-86a5-668cf7ba3094
- https://answers.microsoft.com/en-us/outlook_com/forum/all/outlook-calendar-displaying-wrong-time-zone-in/29a46169-f7a5-412b-a4c8-5547cead615b
- https://answers.microsoft.com/en-us/outlook_com/forum/all/shared-outlook-calendar-shows-wrong-timezone-in/b4703299-308a-4533-917e-6153663702ce
- https://answers.microsoft.com/en-us/outlook_com/forum/all/outlook-calendar-sharing-in-google-calendar-shows/615b68c4-df2d-4011-91f9-d18ea80aa1ec

## LICENSE
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
You can use this project for any purpose, share it, modify it, and distribute it.