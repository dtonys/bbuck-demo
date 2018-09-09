/* eslint-disable */
const request = require('request');
const queryString = require('query-string');
const setCookieParser = require('set-cookie-parser');


const username = encodeURIComponent('malcolm@bbuck.io');
const password = '4thegamers';
const userId = 'e07bfba854ba4cfa98d4133269703e7e';

const client_id = '24a1bff3f90749efbfcbc576c626a282';
const EPIC_DEVICE = '12b98c63b14a0e4e68e9ef8a4f70609f';
const _epicSID = '29f4e8b013f8454b94064e16130d1b6d';
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) EpicGamesLauncher/7.14.2-4231683+++Portal+Release-Live UnrealEngine/4.18.0-4231683+++Portal+Release-Live Safari/537.36';


let EPIC_SSO_SESSION = null;
let EPIC_SSO_SESSION_INSTANCE = null;

function logError( error, response, body ) {
  console.log( 'error', error );
  console.log( 'response.headers', response.headers );
  console.log( 'response.statusCode', response.statusCode );
  console.log( 'body', body );
}

function getEpicSSOSession() {
  return new Promise(( resolve, reject ) => {
    const headers = {
      'Host': 'accounts.launcher-website-prod07.ol.epicgames.com',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': userAgent,
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Cookie': `EPIC_DEVICE=${EPIC_DEVICE}`
    };

    const options = {
      url: `https://accounts.launcher-website-prod07.ol.epicgames.com//login/launcher?redirectUrl=https%3A%2F%2Faccounts.launcher-website-prod07.ol.epicgames.com%2Flogin%2FshowPleaseWait%3Fclient_id%3D${client_id}%26rememberEmail%3Dfalse&client_id=${client_id}&isLauncher=true`,
      headers: headers
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode === 200 ) {
        const cookies = setCookieParser.parse(response.headers['set-cookie']);
        for ( cookie of cookies ) {
          if ( cookie.name === 'EPIC_SSO_SESSION' ) EPIC_SSO_SESSION = cookie.value;
          if ( cookie.name === 'EPIC_SSO_SESSION_INSTANCE' ) EPIC_SSO_SESSION_INSTANCE = cookie.value;
        }
        // console.log('EPIC_SSO_SESSION', EPIC_SSO_SESSION);
        // console.log('EPIC_SSO_SESSION_INSTANCE', EPIC_SSO_SESSION_INSTANCE);
        resolve();
        return;
      }
      reject();
    }

    request(options, callback);
  });
}

let XSRF_Token = null;
function getXSRF_Token() {
  return new Promise(( resolve, reject ) => {
    const headers = {
      'Host': 'accounts.launcher-website-prod07.ol.epicgames.com',
      'Accept': '*/*',
      'Accept-Language': 'en-US',
      'User-Agent': userAgent,
      'Referer': `https://accounts.launcher-website-prod07.ol.epicgames.com//login/launcher?redirectUrl=https%3A%2F%2Faccounts.launcher-website-prod07.ol.epicgames.com%2Flogin%2FshowPleaseWait%3Fclient_id%3D${client_id}%26rememberEmail%3Dfalse&client_id=${client_id}&isLauncher=true`,
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Cookie': `EPIC_DEVICE=${EPIC_DEVICE}; \
EPIC_SSO_SESSION=${EPIC_SSO_SESSION}; \
EPIC_SSO_SESSION_INSTANCE=${EPIC_SSO_SESSION_INSTANCE}`
    };

    const options = {
      url: `https://accounts.launcher-website-prod07.ol.epicgames.com/login/doLauncherLogin?client_id=${client_id}&redirectUrl=https%3A%2F%2Faccounts.launcher-website-prod07.ol.epicgames.com%2Flogin%2FshowPleaseWait%3Fclient_id%3D${client_id}%26rememberEmail%3Dfalse`,
      headers: headers
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode === 200 ) {
        const cookies = setCookieParser.parse(response.headers['set-cookie']);
        for ( cookie of cookies ) {
          if ( cookie.name === 'XSRF-TOKEN' ) {
            XSRF_Token = cookie.value;
          }
        }
        // console.log('XSRF_Token', XSRF_Token);
        resolve();
        return;
      }
      reject();
    }

    request(options, callback);
  });
}

let EPIC_BEARER_TOKEN = null;
function login() {
  return new Promise(( resolve, reject ) => {
    const headers = {
      'Host': 'accounts.launcher-website-prod07.ol.epicgames.com',
      'Accept': '*/*',
      'Accept-Language': 'en-US',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://accounts.launcher-website-prod07.ol.epicgames.com',
      'User-Agent': userAgent,
      'X-XSRF-TOKEN': XSRF_Token,
      'Referer': `https://accounts.launcher-website-prod07.ol.epicgames.com//login/launcher?redirectUrl=https%3A%2F%2Faccounts.launcher-website-prod07.ol.epicgames.com%2Flogin%2FshowPleaseWait%3Fclient_id%3D${client_id}%26rememberEmail%3Dfalse&client_id=${client_id}&isLauncher=true`,
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Cookie': `EPIC_DEVICE=${EPIC_DEVICE}; EPIC_SSO_SESSION=${EPIC_SSO_SESSION}; \
epicCountry=US; XSRF-TOKEN=${XSRF_Token}; \
EPIC_SSO_SESSION_INSTANCE=${EPIC_SSO_SESSION_INSTANCE}; \
_epicSID=${_epicSID}`
    };

    const dataString = `X-XSRF-URI=%2Flogin%2FdoLauncherLogin&fromForm=yes&authType=&linkExtAuth=&client_id=${client_id}&redirectUrl=https%3A%2F%2Faccounts.launcher-website-prod07.ol.epicgames.com%2Flogin%2FshowPleaseWait%3Fclient_id%3D${client_id}%26rememberEmail%3Dfalse&epic_username=${username}&password=${password}`;

    const options = {
      url: 'https://accounts.launcher-website-prod07.ol.epicgames.com/login/doLauncherLogin',
      method: 'POST',
      headers: headers,
      body: dataString,
      followRedirect: false
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode === 200 ) {
        const cookies = setCookieParser.parse(response.headers['set-cookie']);
        for ( cookie of cookies ) {
          if ( cookie.name === 'EPIC_BEARER_TOKEN' ) EPIC_BEARER_TOKEN = cookie.value;
          if ( cookie.name === 'EPIC_SSO_SESSION_INSTANCE' ) EPIC_SSO_SESSION_INSTANCE = cookie.value;
        }
        // console.log('EPIC_BEARER_TOKEN', EPIC_BEARER_TOKEN);
        // console.log('EPIC_SSO_SESSION_INSTANCE', EPIC_SSO_SESSION_INSTANCE);
        resolve();
        return;
      }
      reject();
    }
    request(options, callback);
  });
}

let exchangeCode = null;
function getExchangeCode() {
  return new Promise(( resolve, reject ) => {
    const headers = {
      'Host': 'accounts.launcher-website-prod07.ol.epicgames.com',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': userAgent,
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Cookie': `EPIC_DEVICE=${EPIC_DEVICE}; \
EPIC_SSO_SESSION=${EPIC_SSO_SESSION}; epicCountry=US; \
XSRF-TOKEN=${XSRF_Token}; _epicSID=${_epicSID}; \
EPIC_SSO_SESSION_INSTANCE=${EPIC_SSO_SESSION_INSTANCE}; \
EPIC_SSO=${EPIC_SSO_SESSION}; EPIC_SSO_RM=${EPIC_SSO_SESSION}; \
EPIC_BEARER_TOKEN=${EPIC_BEARER_TOKEN}; EPIC_STAY_SIGNED_IN=false`
    };

    const options = {
        url: `https://accounts.launcher-website-prod07.ol.epicgames.com//login/showPleaseWait?client_id=${client_id}&rememberEmail=false`,
        headers: headers
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode === 200 ) {
        matches = body.match(/loginWithExchangeCode\('(\w+)'/);
        exchangeCode = matches[1];
        // console.log('exchangeCode', exchangeCode);
        resolve();
        return;
      }
      reject();
    }

    request(options, callback);
  });
}

let accessToken = null;
function getAccessToken() {
  return new Promise(( resolve, reject ) => {
    const headers = {
      'Host': 'account-public-service-prod03.ol.epicgames.com',
      'Accept': '*/*',
      'Accept-Encoding': 'br, gzip, deflate',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'game=UELauncher, engine=UE4, build=7.14.2-4231683+++Portal+Release-Live',
      'Authorization': 'basic MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=',
      'Accept-Language': 'en-us',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    };

    const dataString = `grant_type=exchange_code&exchange_code=${exchangeCode}&includePerms=true&token_type=eg1`;

    const options = {
      url: 'https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token',
      method: 'POST',
      headers: headers,
      body: dataString
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode === 200 ) {
        const bodyStr = JSON.stringify(body)
        const bodyObj = JSON.parse(body);
        accessToken = bodyObj.access_token;
        // console.log('accessToken', accessToken);
        resolve(accessToken);
        return;
      }
      reject();
    }

    request(options, callback);
  });
}


function getFriendIdList( _accessToken ) {
  return new Promise(( resolve, reject ) => {
    let friendIdList = [];
    const headers = {
      'Host': 'friends-public-service-prod06.ol.epicgames.com',
      'Content-Type': 'application/json',
      'X-Epic-Correlation-ID': 'UE4-12b98c63b14a0e4e68e9ef8a4f70609f-8EDF03F0324BD386AB94F58EC2BC2C3C-7A4B5076534A8FC8F42C70B7B29088B3',
      'Accept': '*/*',
      'User-Agent': 'game=UELauncher, engine=UE4, build=7.14.2-4231683+++Portal+Release-Live',
      'Authorization': `bearer ${_accessToken}`,
      'Accept-Language': 'en-us',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    };

    const options = {
      url: `https://friends-public-service-prod06.ol.epicgames.com/friends/api/public/friends/${userId}?includePending=true`,
      headers: headers
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode == 200 ) {
        let friendIdList = [];
        const bodyObj = JSON.parse(body);
        console.log('getFriendIdList', bodyObj);
        for ( let friendRequest of bodyObj ) {
          friendIdList.push( friendRequest.accountId );
        }
        resolve( friendIdList );
      }
      reject();
    }
    request(options, callback);
  });
}

function getFriendUsernames( _accessToken, friendIdList ) {
  // if we have no friends on our list, pass empty object
  if ( !friendIdList.length ) {
    return Promise.resolve({});
  }
  return new Promise(( resolve, reject ) => {
    const headers = {
      'Host': 'account-public-service-prod03.ol.epicgames.com',
      'Content-Type': 'application/json',
      'X-Epic-Correlation-ID': 'UE4-12b98c63b14a0e4e68e9ef8a4f70609f-8EDF03F0324BD386AB94F58EC2BC2C3C-C91031B9724CC4C74D597991F9101C3D',
      'Accept': '*/*',
      'User-Agent': 'game=UELauncher, engine=UE4, build=7.14.2-4231683+++Portal+Release-Live',
      'Authorization': `bearer ${_accessToken}`,
      'Accept-Language': 'en-us',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    };
    const options = {
      url: `https://account-public-service-prod03.ol.epicgames.com/account/api/public/account?${queryString.stringify({ accountId: friendIdList })}`,
      headers: headers
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode == 200 ) {
        let friendUsernameToIdMap = {};
        const bodyObj = JSON.parse(body);
        for ( let friendRequest of bodyObj ) {
          friendUsernameToIdMap[friendRequest.displayName] = friendRequest.id;
        }
        resolve(friendUsernameToIdMap);
      }
      reject();
    }
    request(options, callback);
  });
}

function loginFlow() {
  return getEpicSSOSession()
    .then(() => {
      return getXSRF_Token();
    })
    .then(() => {
      return login();
    })
    .then(() => {
      return getExchangeCode();
    })
    .then(() => {
      return getAccessToken();
    });
}

function getFriendsFlow( _accessToken ) {
  return getFriendIdList( _accessToken )
    .then(( friendIdList ) => {
      return getFriendUsernames( _accessToken, friendIdList );
    })
}

exports.removeFriendRequest = function removeFriendRequest( friendId, _accessToken ) {
  return new Promise(( resolve, reject ) => {
    const request = require('request');
    const headers = {
      'Host': 'friends-public-service-prod06.ol.epicgames.com',
      'Content-Type': 'application/json',
      'X-Epic-Correlation-ID': 'UE4-12b98c63b14a0e4e68e9ef8a4f70609f-8EDF03F0324BD386AB94F58EC2BC2C3C-C91031B9724CC4C74D597991F9101C3D',
      'Accept': '*/*',
      'User-Agent': 'game=UELauncher, engine=UE4, build=7.14.2-4231683+++Portal+Release-Live',
      'Authorization': `bearer ${_accessToken}`,
      'Accept-Language': 'en-us',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    };

    const options = {
      url: `https://friends-public-service-prod06.ol.epicgames.com/friends/api/public/friends/${userId}/${friendId}`,
      method: 'DELETE',
      headers: headers
    };

    function callback(error, response, body) {
      if ( error || response.statusCode !== 200 ) logError(error, response, body);
      if ( !error && response.statusCode == 204 ) {
        // console.log('removeFriendRequest success');
        resolve();
        return;
      }
      reject();
    }
    request(options, callback);
  });

  return Promise.resolve();
}

// returns access token required for making logged in requests
exports.runEpicLoginFlow = function runEpicLoginFlow() {
  return loginFlow()
    .then(( accessToken ) => {
      console.log('runEpicLoginFlow done:');
      console.log('accessToken', accessToken);
      return accessToken;
    })
    .catch((err) => {
      console.log('login flow error');
      console.log(err);
    });
}

// gets the list of epic friends
exports.runEpicGetFriendsFlow = function runEpicGetFriendsFlow( _accessToken ) {
  return getFriendsFlow( _accessToken )
    .then((friendMap) => {
      return friendMap;
    })
    .catch((err) => {
      console.log('runEpicGetFriendsFlow flow error');
      console.log(err);
    });
};

