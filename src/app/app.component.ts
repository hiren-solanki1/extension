import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    console.log('this is called')
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      const tab = tabs[0];

      // Check if the tab URL matches the target domain
      if (tab && tab.url) {
        if (tab.url.startsWith("https://kevit.keka.com/")) {
          // Use chrome.cookies API to get cookies for the specific domain
          chrome.cookies.getAll({domain: "keka.com"}, function (cookies) {
            const cookieData = cookies.map(function (cookie) {
              return `${cookie.name}=${cookie.value}`;
            });
            console.log('cokiee', cookieData)
            const apiUrl = 'https://kevit.keka.com/k/attendance/api/mytime/attendance/summary';

            const headers = {
              'authority': 'kevit.keka.com',
              'accept': 'application/json, text/plain, */*',
              'accept-language': 'en-US,en;q=0.9',
              'authorization': 'Bearer C98FD50415983EFE9DB5C43B64DF61F61E18EA4406B3D2B595D2214BA6F4A70C-1',
              'cache-control': 'no-cache',
              'content-type': 'application/json; charset=utf-8',
              'pragma': 'no-cache',
              'referer': 'https://kevit.keka.com/',
              'Cookie': cookieData.join('; '),
              'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
              'x-requested-with': 'XMLHttpRequest'
            }

            fetch(apiUrl, {
              method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
              headers: headers,
            })
              .then(response => response.json())
              .then(data => {
                console.log('API Response:', data);
              })
              .catch(error => {
                console.error('API Error:', error);
              });
          });
        } else {
          console.error('The active tab does not match the target domain.');
        }

      }
    })
  }
}



