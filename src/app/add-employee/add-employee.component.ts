import { EmployeeService } from './../services/employee.service';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  constructor(private _fb: FormBuilder, private service: EmployeeService, private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader, private router: Router) {
  }
;

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  @ViewChild('search')
  public searchElementRef: ElementRef;
  _empForm: FormGroup;
  location;
  latitude: number;
  longitude: number;
  zoom: number;
  zip_code: string;
  name: string;
  web_site: string;
  address: string;

  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public facingMode: string = 'environment';
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>()
  formattedaddress = ' ';

  options = {
    componentRestrictions: {
      country: ['AU']
    }
  }


  ngOnInit(): void {
    this.service.getPosition().then(pos => {
      console.log(pos)
      this.latitude = pos.lat;
      this.longitude = pos.lng
      this.location = `${'lng:' + pos.lng} ${'lat:' + pos.lat}`
      this._empForm.get('location').setValue(this.location)
      this._empForm.updateValueAndValidity()
      console.log(this.location)
    });
    this.initializeEmpForm()
  }

  initializeEmpForm() {
    this._empForm = this._fb.group(
      {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required]],
        location: [this.location, []],
        address: ['', []],
        'profile-image': [],
        image: []
      }
    )
  }
  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address
  }

  onSubmit(values) {
    this.service.saveDetails(values).subscribe(data => {
      console.log(data)
      this.router.navigate(['employee-list'])
    })
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this._empForm.get('image').setValue(reader.result)
    };
  }

  openWebCam() {
    this.showWebcam = !this.showWebcam
    this.webcamImage = null
    if (this.showWebcam) {
      this._empForm.get('image').setValue('');
      this._empForm.get('profile-image').setValue('');
      this._empForm.get('profile-image').disable()
    }
  }  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this._empForm.get('image').setValue(webcamImage.imageAsDataUrl)
  }
}
