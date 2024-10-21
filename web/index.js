import '../vendor/wasm_exec.js'; // Import Go WebAssembly support
import mod from '../bin/main.wasm'; // Your Go WASM module

export default {
    async fetch(request) {
        // get request URL
        const url = new URL(request.url);

        // handle favicon requests
        if(url.pathname === "/favicon.ico") {
            return new Response("No favicon", {
                headers: { 'content-type': 'text/plain' }
            });
        }

        // Instantiate the WebAssembly module
        const go = new Go(); // Go WebAssembly runtime setup
        const instance = WebAssembly.instantiate(mod, go.importObject);

        url.hostname = "outlook.office365.com";
        url.protocol = "https";
        url.port = 443;

        // Fetch the ICS calendar content from outlook.office365.com
        const response = await fetch(url);
        const icsContent = await response.text();

        if(response.status !== 200) {
            return new Response("Endpoint: " + url.hostname + " HTTP Status Code: " + response.status, {
                headers: { 'content-type': 'text/plain' },
                status: response.status
            });
        }

        // Run the Go runtime
        go.run(await instance);

        // Call the Go function to clean up the timezones, passing the ICS content
        const modifiedContent = CleanupIcsCalendarTimezones(icsContent);

        return new Response(modifiedContent, {
            headers: { 'content-type': 'text/plain' }
        });
    }
};