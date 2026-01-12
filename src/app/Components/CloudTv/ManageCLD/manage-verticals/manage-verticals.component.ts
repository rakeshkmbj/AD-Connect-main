import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Data {
    vertId: string;
    vertName: string;
    image: string;
    activeflg: boolean;
    detaultflg: boolean;
    sequence: string;
    serial: number;
}

@Component({
    selector: 'app-manage-verticals',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule],
    templateUrl: './manage-verticals.component.html',
    styleUrls: ['./manage-verticals.component.css']
})
export class ManageVerticalsComponent {
    readonly MAX_FILE_SIZE_MB = 100;
    base64Image: string | null = '';
    fileSize: string = '';
    mediaRunCount: number | string = 0;
    currentImagefile: File | null = null;
    tempimg:string = '';

    newVertical: Data = {
        vertId: "",
        vertName: "",
        image: "",
        activeflg: true,
        detaultflg: true,
        sequence: "",
        serial: 0
    };
    verData: Data[] = [];

    sequence:number[] = [];

    selectedVertical: Data = {
        vertId: "",
        vertName: "",
        image: "",
        activeflg: true,
        detaultflg: true,
        sequence: "",
        serial: 0
    };

    isPopupVisible1 = false;
    isPopupVisible2 = false;
    isManageHomePromosVisible = false;

    edit = "../../../../../assets/editing.png";
    valid = "../../../../../assets/check.png";
    unvalid = "../../../../../assets/uncheck.png";

    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient
    ) {}

    isMasterAppVisible = true;
    isVerticalVisible = false;

    toggleVertical(){
        this.isMasterAppVisible = false;
        this.isVerticalVisible = true;
    }

    toggleMasterApp(){
        this.isMasterAppVisible = true;
        this.isVerticalVisible = false;
    }

    toggleManageHomePromos() {
        this.isManageHomePromosVisible = !this.isManageHomePromosVisible;
    }

    togglePopup1() {
        this.SelectedVerticalImageToBeAdded = "" 

        this.newVertical = {
            vertId: "",
            vertName: "",
            image: "",
            activeflg: true,
            detaultflg: true,
            sequence: "",
            serial: 0
        };

        this.isPopupVisible1 = !this.isPopupVisible1;
    }
    async togglePopup2(serial:number, vertical?: Data) {
        this.SelectedVerticalImageToBeAdded = ""; 

        this.isPopupVisible2 = !this.isPopupVisible2;
        if (vertical && serial!= -1) {
            console.log("togglePopup2 is called");
            console.log("This vertical:", vertical);
    
            // Populate selectedVertical with data for editing
            this.selectedVertical.vertId = vertical.vertId;
            this.selectedVertical.vertName = vertical.vertName;
            this.selectedVertical.activeflg = vertical.activeflg;
            this.selectedVertical.detaultflg = vertical.detaultflg;
            this.selectedVertical.sequence = vertical.sequence;
            this.selectedVertical.image = vertical.image;
            this.selectedVertical.serial = serial;
            this.tempimg = vertical.image;
    
            // try {
            //     const imageBlob = await firstValueFrom(this.http.get(vertical.image, { responseType: 'blob' }));
                
            //     this.currentImagefile = new File([imageBlob], "Image.jpg", { type: imageBlob.type });
            //     console.log("Image file downloaded and set to currentImagefile:", this.currentImagefile);
    
            //     const reader = new FileReader();
            //     reader.onloadend = () => {
            //         this.selectedVertical.image = reader.result as string;
            //     };
            //     reader.readAsDataURL(this.currentImagefile);
            // } catch (error) {
            //     console.error("Error downloading image:", error);
            //     this.showSnackbar('Failed to download image');
            // }
    
            console.log("selected vertical:", this.selectedVertical);
    
        } else {
            this.resetForm();
        }
    }

    async addVertical(formRef: NgForm) {

        if (formRef.invalid) {
            return; // Stop form submission if invalid
        }

        if(this.newVertical.image){
        if (this.newVertical.vertName.trim()) {
            try {
                // Make sure createVertical returns a value (preferably an array)
                const res = await this.createVertical(this.newVertical.vertName, this.newVertical.image);
                
                // Check if res is an array before calling map
                if (Array.isArray(res)) {
                    this.verData = res.map(item => ({
                        vertId: item.d2cCldtvVerticalId,
                        vertName: item.d2cCldtvVerticalName,
                        image: "http://www.shripatigroup.com/" + item.d2cCldtvVerticalImg.substring(2),
                        activeflg: item.d2cCldtvVerticalActivFlg,
                        detaultflg: item.d2cCldtvVerticalDefaultFlg,
                        sequence: item.d2cCldtvVerticalSeqence || '',
                        serial:0
                    }));
                } else {
                    this.showSnackbar('Unexpected response format');
                    return;
                }
    
                this.snackBar.open('Vertical added successfully!', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
    
                this.resetForm();
                this.togglePopup1();
            } catch (error: any) {
                if (error?.error === "Vertical Already Present") {
                    this.showSnackbar('Vertical Already Present');
                } else {
                    this.showSnackbar('Failed to save vertical');
                }
    
                this.resetForm();
                this.togglePopup1();
            }
        } else {
            this.showSnackbar('Please enter a valid vertical name');
            this.resetForm();
            this.togglePopup1();
        }
    } else {
        this.showSnackbar('Please select an image for vertical');
    }

    this.SelectedVerticalImageToBeAdded = "";

    }

    SelectedVerticalImageToBeAdded = "";
    
    async onFileChange(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > this.MAX_FILE_SIZE_MB) {
                this.resetMediaSelection();
                this.showSnackbar('Please upload an image less than 100 MB.');
                return;
            }

            this.fileSize = `${fileSizeMB.toFixed(1)} MB`;
            this.base64Image = await this.readFileAsBase64(file);
            this.SelectedVerticalImageToBeAdded = this.base64Image;
            this.base64Image = this.base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
            this.newVertical.image = this.base64Image || '';
            this.selectedVertical.image = this.base64Image || '';
            console.log(this.newVertical.image)
            this.mediaRunCount = file.type.startsWith('image') ? 1 : await this.getMediaDuration(file);
            this.checkMediaRunCount();
        }
    }

    private async getMediaDuration(file: File): Promise<number | string> {
        if (file.type.startsWith('video') || file.type.startsWith('audio')) {
            try {
                const duration = await this.loadMediaDuration(file);
                return `${Math.round(duration)} sec`;
            } catch {
                this.showSnackbar('Error loading media. Please select a valid file.');
                this.resetMediaSelection();
            }
        }
        return 0;
    }

    private loadMediaDuration(file: File): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const mediaElement = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
            mediaElement.preload = 'metadata';
            mediaElement.onloadedmetadata = () => {
                resolve(mediaElement.duration);
                mediaElement.remove();
            };
            mediaElement.onerror = (event) => {
                reject(event);
                mediaElement.remove();
            };
            mediaElement.src = URL.createObjectURL(file);
            document.body.appendChild(mediaElement);
        });
    }

    private async readFileAsBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject('Error reading file');
            reader.readAsDataURL(file);
        });
    }

    private resetMediaSelection() {
        this.base64Image = '';
        this.fileSize = '';
        this.mediaRunCount = 0;
    }

    private showSnackbar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

    private checkMediaRunCount() {
        if (typeof this.mediaRunCount === 'number' && this.mediaRunCount > 180) {
            this.resetMediaSelection();
            this.showSnackbar('The media should be less or equal to 180 seconds.');
        } else {
            console.log("Media ready for display.");
        }
    }

    private resetForm() {
        this.newVertical = {
            vertId: "",
            vertName: "image",
            image: "",
            activeflg: true,
            detaultflg: true,
            sequence: "",
            serial:0
        };
    }

   async fetchVerticals() {
    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/GetCLDtvDISPVERTICALS';
    try {
        const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
        console.log(res);

        // Map response data to match the Data interface
        this.verData = res.map(item => ({
            vertId: item.d2cCldtvVerticalId,
            vertName: item.d2cCldtvVerticalName,
            image: "http://www.shripatigroup.com/" + item.d2cCldtvVerticalImg.substring(2),
            activeflg: item.d2cCldtvVerticalActivFlg,
            detaultflg: item.d2cCldtvVerticalDefaultFlg,
            sequence: item.d2cCldtvVerticalSeqence || '',
            serial:0
        }));

        // Create an array with numbers from 0 to res.length - 1
        const availableSequences = Array.from({ length: res.length }, (_, i) => i);

        // Remove values that are already in use in the sequence fields of verData
        this.verData.forEach(vertical => {
            const seq = parseInt(vertical.sequence, 10); // Parse sequence as an integer
            if (!isNaN(seq)) { // Ensure it's a valid number
                const index = availableSequences.indexOf(seq);
                if (index !== -1) {
                    availableSequences.splice(index, 1); // Remove used sequence
                }
            }
        });

        // Assign the remaining values to the sequence array
        this.sequence = availableSequences;
        console.log("Available sequences: ", this.sequence);

    } catch (error) {
        console.error(error);
        this.showSnackbar('No Vertical');
    }
}


    async editVertical() {

        if (!this.selectedVertical) return;
        if(this.selectedVertical.image) {

        const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditCLDTVVERTICAL';
        const updateData = {
            vertId: this.selectedVertical.vertId,
            image: this.selectedVertical.image.startsWith("http") ? "" : this.selectedVertical.image,
            activeflg: this.selectedVertical.activeflg,
            detaultflg: this.selectedVertical.detaultflg,
            sequence: this.selectedVertical.sequence
        };

        console.log("update Data:", updateData)

        try {
            const res = await firstValueFrom(this.http.post(apiUrl, updateData));
            this.snackBar.open('Vertical edited successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });

            console.log("response he yo: ",res)

            if (Array.isArray(res)) {
                this.verData = res.map(item => ({
                    vertId: item.d2cCldtvVerticalId,
                    vertName: item.d2cCldtvVerticalName,
                    image: "http://www.shripatigroup.com/" + item.d2cCldtvVerticalImg.substring(2),
                    activeflg: item.d2cCldtvVerticalActivFlg,
                    detaultflg: item.d2cCldtvVerticalDefaultFlg,
                    sequence: item.d2cCldtvVerticalSeqence || '',
                    serial:0
                }));
            } else {
                this.showSnackbar('Unexpected response format');
                return;
            }

            // const index = this.verData.findIndex(v => v.vertId === this.selectedVertical?.vertId);
            // if (index !== -1) this.verData[index] = { ...this.selectedVertical };
            this.togglePopup2(-1);
        } catch (error) {
            this.showSnackbar('Failed to edit vertical');
        }
    } else {
        this.showSnackbar('Please select an image for vertical');
    }

    this.SelectedVerticalImageToBeAdded = "" 

    }

    async saveVertical(vertical: Data) {
        const apiUrl = 'http://your-backend-url.com/api/save-vertical';
        await firstValueFrom(this.http.post(apiUrl, vertical));
    }

    async createVertical(vertName: string, image: string) {
        const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddCLDTVVERTICAL';
        await firstValueFrom(this.http.post(apiUrl, { vertName, image }));
    }

    ngOnInit() {
        this.fetchVerticals();
    }
}
