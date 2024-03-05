import { LightningElement,api } from 'lwc';

export default class BoatStar extends LightningElement {
    @api star;

    arr = [1,2,3,4,5];
    get rating() {
        
        return this.arr.slice(0,this.star);
    }

    get starIcon() {
        return 'custom:custom11';
    }
}