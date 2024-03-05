import {LightningElement, api} from 'lwc';
import updateBoatList from '@salesforce/apex/BoatDataService.updateBoatListDuplicate';
const columns = [{
    label: 'Name', fieldName: 'Name', editable: true
},
{
    label: 'Length', fieldName: 'Length__c', editable: true
},
{
    label: 'Picture', fieldName: 'Picture__c', editable: true
},
{
    label: 'Price', fieldName: 'Price__c', editable: true
},
{
    label: 'YearBuilt', fieldName: 'Year_Built__c', editable: true
}];
export default class BoatEditor extends LightningElement {
    @api boatdata;
    columns = columns;
    rowOffset = 0;
    handleSave(event) {
        console.log(event);
        console.log(event.target);
    }
    saveDraftValues = [];
    handleSave(event){
        this.saveDraftValues = event.detail.draftValues;
        updateBoatList({
            data:this.saveDraftValues
        }).then((res)=>{
            console.log(res+" updated")
            this.saveDraftValues = [];
            const Event = new CustomEvent('refresh');
            this.dispatchEvent(Event);
        }).catch((error)=>{
            console.log(error+" not updates");
        })
    }
}