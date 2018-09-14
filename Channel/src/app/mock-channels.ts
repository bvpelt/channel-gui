import {Channel} from './domain/channel';
import {ChannelResult} from "./domain/channelResult";
import {Link} from "./domain/link";

export const CHANNELS: Channel[] = [
  {name: 'Channel 01', _links: null},
  {name: 'Channel 02', _links: null},
  {name: 'Channel 03', _links: null},
  {name: 'Channel 04', _links: null}
];

export const SELF: Link = {
    "href": "http://localhost:8080/1"
  };

export const CHANNELRESULT: ChannelResult = {
  "channel": [{
    "name": "Reizen",
    "_links": {
      "self": {
        "href": "http://localhost:8080/1"
      }
    }
  }, {
    "name": "Boeken",
    "_links": {
      "self": {
        "href": "http://localhost:8080/2"
      }
    }
  }, {
    "name": "Nederland",
    "_links": {
      "self": {
        "href": "http://localhost:8080/3"
      }
    }
  }, {
    "name": "Belgie",
    "_links": {
      "self": {
        "href": "http://localhost:8080/4"
      }
    }
  }, {
    "name": "Duitsland",
    "_links": {
      "self": {
        "href": "http://localhost:8080/5"
      }
    }
  }, {
    "name": "Frankrijk",
    "_links": {
      "self": {
        "href": "http://localhost:8080/6"
      }
    }
  }, {
    "name": "Denemarken",
    "_links": {
      "self": {
        "href": "http://localhost:8080/7"
      }
    }
  }, {
    "name": "Oostenrijk",
    "_links": {
      "self": {
        "href": "http://localhost:8080/8"
      }
    }
  }, {
    "name": "Polen",
    "_links": {
      "self": {
        "href": "http://localhost:8080/9"
      }
    }
  }, {
    "name": "Italie",
    "_links": {
      "self": {
        "href": "http://localhost:8080/10"
      }
    }
  }, {
    "name": "Spanje",
    "_links": {
      "self": {
        "href": "http://localhost:8080/11"
      }
    }
  }, {
    "name": "Portugal",
    "_links": {
      "self": {
        "href": "http://localhost:8080/12"
      }
    }
  }],
  "_links": {
    "self": {
      "href": "http://localhost:8080/channels"
    }
  }
};
