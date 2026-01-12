import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Data {
    vertId: string,
    verName: string,
    productId: string,
    prouctName: string,
    image: string,
    activeflg: boolean,
}

interface VerData {
    vertId: string,
    verName: string,
}

@Component({
    selector: 'app-manage-prod-lines',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule],
    templateUrl: './manage-prod-lines.component.html',
    styleUrls: ['./manage-prod-lines.component.css']
})
export class ManageProdLinesComponent implements OnInit {
    constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

    edit = "../../../../../assets/editing.png";
    valid = "../../../../../assets/check.png";
    unvalid = "../../../../../assets/uncheck.png";

    isPopupAddAdInterval = false;
    isPopupADMonitization = false;
    isPopupVisible = false;
    isEitPopupVisible = false;
    base64Image = '';
    fileSize = '';
    mediaRunCount: number | string = 0;
    MAX_FILE_SIZE_MB = 100;
    sequence:number[]=[];
    currentImagefile: File | null = null;
    tempimg:string=''
    verArr:VerData[]=[];
    selver:VerData= {
        verName:'',
        vertId:'',
    }

    newVertical: Data = {
        vertId: '',
        verName: '',
        productId: '',
        prouctName: '',
        image: '',
        activeflg: true,
    };

    selectedVertical: Data = {
        vertId: '',
        verName: '',
        productId: '',
        prouctName: '',
        image: '',
        activeflg: true,
    };

    isPanIndiaChecked:boolean = false;

    verData: Data[] = [];
    sampleData: Data[] = [];

    onPanIndiaCheckedChange(event: Event) {
        const isChecked = (event.target as HTMLInputElement).checked;
    
        if (isChecked) {
          this.isPanIndiaChecked = false;
        } else {
          this.isPanIndiaChecked = true;
        }
    }

    togglePopup(): void {
        this.SelectedProductLineImageToBeAdded = "";

        this.selectedVertical = {
            vertId: '',
            verName: '',
            productId: '',
            prouctName: '',
            image: '',
            activeflg: true,
        };
    
        this.isPopupVisible = !this.isPopupVisible;
    }

    toggleEditPopup(serial:number, vertical?:Data): void {
        this.SelectedProductLineImageToBeAdded = ''

        console.log("toggleEditPopup called")
        this.isEitPopupVisible = !this.isEitPopupVisible;
        if(vertical && serial != -1){
            this.selectedVertical.vertId = vertical.vertId;
            this.selectedVertical.verName = vertical.verName;
            this.selectedVertical.image = vertical.image;
            this.selectedVertical.activeflg = vertical.activeflg;
            this.selectedVertical.productId = vertical.productId;
            this.selectedVertical.prouctName = vertical.prouctName;
            this.tempimg = vertical.image;
        }
        else {
            this.resetForm();
        }
    }

    toggleAddAdInterval() {
        this.isPanIndiaChecked = true;
        this.isPopupAddAdInterval = !this.isPopupAddAdInterval
    }

    toggleADMonitization(){
        this.isPopupADMonitization = !this.isPopupADMonitization
    }

    onVerSelect(event: Event) {
        const verName = (event.target as HTMLSelectElement).value;
    
        this.selectedVertical.verName = verName;
    
        const selectedData = this.verArr.find(data => data.verName === verName);
    
        this.selectedVertical.vertId = selectedData ? selectedData.vertId : ''; 
        this.selectedVertical.activeflg = true;
        this.selectedVertical.image ='';
        this.selectedVertical.productId ='';
        this.selectedVertical.prouctName ='';
    }
    

    async addProuctLine(formRef: NgForm) {

        if (formRef.invalid) {
            return; 
        }

        if (this.selectedVertical.verName.trim()) {
            console.log(this.selectedVertical.vertId);
            console.log(this.selectedVertical.verName);
            console.log(this.selectedVertical.image);
            try {
                
                const res = await this.createProductLine(this.selectedVertical.vertId, this.selectedVertical.prouctName, this.selectedVertical.image);
                console.log(res)

                await this.fetchProductLine()
    
                if(res != undefined){
                this.snackBar.open('Product Line added successfully!', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
                }
    
                this.resetForm();
                this.togglePopup();
            } catch (error: any) {
                if (error?.error === "Product Line Already Available") {
                    this.showSnackbar('Product Line Already Available');
                } else {
                    this.showSnackbar('Failed to save Prodduct Line');
                }
    
                this.resetForm();
                this.togglePopup();
            }
        } else {
            this.showSnackbar('Please enter a valid vertical name');
            this.resetForm();
            this.togglePopup();
        }

        this.SelectedProductLineImageToBeAdded = "";
    }
    

    private resetForm() {
        this.selectedVertical = {
            vertId: '',
            verName: '',
            productId: '',
            prouctName: '',
            image: '',
            activeflg: true,
        };
    }

    SelectedProductLineImageToBeAdded = '';

    async onFileChange(event: Event): Promise<void> {
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
            this.SelectedProductLineImageToBeAdded = this.base64Image;
            this.base64Image = this.base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
            this.selectedVertical.image = this.base64Image || '';
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
            mediaElement.onerror = () => {
                reject();
                mediaElement.remove();
            };
            mediaElement.src = URL.createObjectURL(file);
            document.body.appendChild(mediaElement);
        });
    }

    private checkMediaRunCount(): void {
        if (typeof this.mediaRunCount === 'number' && this.mediaRunCount > 180) {
            this.resetMediaSelection();
            this.showSnackbar('The media should be less or equal to 180 seconds.');
        } else {
            console.log("Media ready for display.");
        }
    }

    private async readFileAsBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject('Error reading file');
            reader.readAsDataURL(file);
        });
    }

    private resetMediaSelection(): void {
        this.base64Image = '';
        this.fileSize = '';
        this.mediaRunCount = 0;
    }

    private showSnackbar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

    async fetchVerticals(): Promise<void> {
        const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/GetDROPLISTCLDTVVERTICAL';
        try {
            const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
            console.log(res)
            this.verArr = res.map(item => ({
                vertId: item.d2cCldtvVerticalId,
                verName: item.d2cCldtvVerticalName,
            }));

            this.selectedVertical.verName = this.verArr[0].verName;
            this.selectedVertical.vertId = this.verArr[0].vertId;
            this.selectedVertical.activeflg = true;
            this.selectedVertical.image = '';
            this.selectedVertical.productId = '';
            this.selectedVertical.prouctName = '';

            // await this.fetchProductLine();
        } catch (error) {
            console.error(error);
            this.showSnackbar('Failed to fetch verticals');
        }
    }

    async fetchProductLine(): Promise<void> {
        const apiUrl = "http://www.shripatigroup.com/ADMedia/api/ADMedia/DispCLDTVProdline";
        try {
            const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
            console.log("API Response for Product Lines:", res);
            
            this.sampleData = res.map(item => ({
                vertId: String(item.adcMastrVertId),  
                verName: (this.verArr.find(data => String(data.vertId) === String(item.adcMastrVertId))?.verName) || '', // Default to empty string
                productId: item.adcMastrProdlineId,
                prouctName: item.adcMastrProdlineName,
                image: "http://www.shripatigroup.com/" + item.adcMastrProdlineImage.substring(2),
                activeflg: item.adcMastrProdlineActivFlg,
            }));
    
            console.log("Sample data after assigning verName:", this.sampleData);
            
        } catch (error) {
            console.error(error);
            this.showSnackbar('Product Line is empty');
            this.sampleData = [];
        }
    }
          
    async createProductLine(verT_ID: string, name: string, image: string) {
        const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddCLDTVProdline';
        try {
            await firstValueFrom(this.http.post(apiUrl, { verT_ID, name, image }));
        } catch(err){
            console.log("Product Line Already Available")
            this.showSnackbar('Product Line Already Available');
        }
    }

    async editProductLine() {
        if (!this.selectedVertical) return;

        const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditCLDTVProdline';
        const updateData = {
            productLineId: this.selectedVertical.productId,
            name: this.selectedVertical.prouctName,
            image: this.selectedVertical.image.startsWith("http") ? "" : this.selectedVertical.image,
            active: this.selectedVertical.activeflg,
        };

        console.log("update Data:", updateData)

        try {
            const res = await firstValueFrom(this.http.post(apiUrl, updateData));
            this.snackBar.open('Product Line edited successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });

            await this.fetchProductLine()

            console.log("response he yo: ",res)

            
            this.toggleEditPopup(-1);
        } catch (error:any) {
            if(error?.error === "Vertical Already Present")
                this.showSnackbar('Vertical Already Present');
            else
                this.showSnackbar('Failed to edit vertical');

            this.toggleEditPopup(-1);
        }

        this.SelectedProductLineImageToBeAdded = ''
    }

    ngOnInit(): void {
        this.fetchVerticals().then(() => {
            this.fetchProductLine(); 
        });
    }    
}
