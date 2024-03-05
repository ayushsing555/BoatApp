import { LightningElement,api, wire } from 'lwc';

export default class BoatReview extends LightningElement {
     @api boatid
     @api boatreviewdata;
}