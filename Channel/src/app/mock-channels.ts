import {Channel} from './domain/channel';
import {ChannelResult} from "./domain/channelResult";
import {Link} from "./domain/link";
import {SelfLink} from "./domain/selfLink";

export const CHANNELS: Channel[] = [
  new Channel('Channel 01', null),
  new Channel('Channel 02', null),
  new Channel('Channel 03', null),
  new Channel('Channel 04', null)
];


export const SELF: Link = new Link("http://localhost:8080/1");

const c: Channel = new Channel('a', new SelfLink(new Link('b')));

export const CHANNELRESULT: ChannelResult = {
  "channel": [
    new Channel('Reizen',     new SelfLink(new Link('http://localhost:8080/1'))),
    new Channel('Boeken',     new SelfLink(new Link('http://localhost:8080/2'))),
    new Channel('Nederland',  new SelfLink(new Link('http://localhost:8080/3'))),
    new Channel('Belgie',     new SelfLink(new Link('http://localhost:8080/4'))),
    new Channel('Duitsland',  new SelfLink(new Link('http://localhost:8080/5'))),
    new Channel('Frankrijk',  new SelfLink(new Link('http://localhost:8080/6'))),
    new Channel('Denemarken', new SelfLink(new Link('http://localhost:8080/7'))),
    new Channel('Oostenrijk', new SelfLink(new Link('http://localhost:8080/8'))),
    new Channel('Polen',      new SelfLink(new Link('http://localhost:8080/9'))),
    new Channel('Italie',     new SelfLink(new Link('http://localhost:8080/10'))),
    new Channel('Spanje',     new SelfLink(new Link('http://localhost:8080/11'))),
    new Channel('Portugal',   new SelfLink(new Link('http://localhost:8080/12')))
  ],
  "_links": new SelfLink(new Link('http://localhost:8080/channels'))
};
