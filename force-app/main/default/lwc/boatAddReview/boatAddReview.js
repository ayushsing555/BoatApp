import {LightningElement, api, wire} from 'lwc';
import AddReviews from '@salesforce/apex/BoatDataService.AddReview';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class BoatAddReview extends LightningElement {
    @api boatid;

    reviewName = "";
    reviewComment = "";
    reviewRating = "";

    handleChange(event) {
        let label = event.target.name;
        let value = event.target.value;
        if (label == 'name') {
            this.reviewName = value;
        }

        else if (label == 'comment') {
            this.reviewComment = value;
        }

        else if (label == 'star') {
            this.reviewRating = value;
        }
    }

    toastFire(variant, message, title) {
        console.log(variant);
        console.log(message);
        console.log(title)
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    AddViews() {
        if (this.reviewComment == "" || this.reviewName == "" || this.reviewRating == "") {
            this.toastFire('error', 'please fill the all the fields', 'Add Review Failed');
        }
        else {
            AddReviews({
                Name: this.reviewName,
                Rating: this.reviewRating,
                Comment: this.reviewComment,
                BoatId: this.boatid
            }).then((res) => {
                const event = new CustomEvent('refresh');
                this.dispatchEvent(event);
                this.toastFire('success','Successfully Added','Success');
            }).catch((err) => {
                console.log(err+" ayush");
            });
        }
    }
}