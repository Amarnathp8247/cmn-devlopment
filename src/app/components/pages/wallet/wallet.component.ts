import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, and Validators
import { WalletServiceService } from '../../../services/wallet/wallet-service.service'; // Import the service
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  // Declare form groups
  stakeForm: FormGroup;
 

  token: any;
  avilableBalance:any

  constructor(
    private walletService: WalletServiceService,
    private fb: FormBuilder, // Inject FormBuilder
    private toastr: ToastrService
  ) {
    // Initialize the form groups in the constructor
    this.stakeForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
    });
   
    
   
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    this.avilableBalance = localStorage.getItem('balance')
  }

  stake() {
    if (this.stakeForm.valid) {
      const stakeAmount = this.stakeForm.value; // Get the value from the form
      this.walletService.stake(stakeAmount, this.token).subscribe({
        next: (response:any) => {
          this.toastr.success(response.message, '', {
            toastClass: 'toast-custom toast-success',
            positionClass: 'toast-bottom-center',
            closeButton: false,
            timeOut: 3000,
            progressBar: true
          });
          // Handle success notification here
        },
        error: (err) => {
          const errorMessage = err.error?.message || 'Error validating referral code';
        
          this.toastr.error(errorMessage, '', {
            toastClass: 'toast-custom toast-error',
            positionClass: 'toast-bottom-center',
            closeButton: false,
            timeOut: 3000,
            progressBar: true
          });
         
        }
      });
    }
  }


 

  convertWallet() {
   
      this.walletService.convertWalletFormData(this.token).subscribe({
        next: (response) => {
          this.toastr.success(response.message, '', {
            toastClass: 'toast-custom toast-success',
            positionClass: 'toast-bottom-center',
            closeButton: false,
            timeOut: 3000,
            progressBar: true
          });
        },
        error: (err) => {
          const errorMessage = err.error?.message || 'Error validating referral code';
        
          this.toastr.error(errorMessage, '', {
            toastClass: 'toast-custom toast-error',
            positionClass: 'toast-bottom-center',
            closeButton: false,
            timeOut: 3000,
            progressBar: true
          });
        }
      });
    
  }
}
