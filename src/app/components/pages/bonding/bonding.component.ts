import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from 'src/app/services/auth/auth-services.service';
import { WalletServiceService } from 'src/app/services/wallet/wallet-service.service';

@Component({
  selector: 'app-bonding',
  templateUrl: './bonding.component.html',
  styleUrls: ['./bonding.component.scss']
})
export class BondingComponent {
  stakeForm: FormGroup;
  token: any;

  page = 1;
  sizePerPage = 10;
  transactionType = 'BOND-IN';
  transactions: any = [];
  totalTransactions: number = 0; 
  loading = false;
  userBlance: any;
  totalInternalTransferBalance: any;
  constructor(
    private walletService: WalletServiceService,
    private fb: FormBuilder, // Inject FormBuilder
    private toastr: ToastrService,
    private authServices: AuthServicesService,
   
  ) {
    // Initialize the form groups in the constructor
    this.stakeForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
    });
   
    
   
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    this.fetchWalletTransactions(this.page, this.sizePerPage); // Refresh transactions after deposit
    this.getUserData()
  }

  getUserData(){

    this.authServices.getProfile(this.token).subscribe({
      next: (response) => {
        
  
        // this.userBlance = response.data.BUSDBalance
        this.totalInternalTransferBalance = response.data.TRADEBalance
        
      },
      error: (error) => {
        this.toastr.error('Failed to load profile information', 'Error');
        this.loading = false;
      }
    });
  }

  stake() {
    if (this.stakeForm.valid) {
      const stakeAmount = this.stakeForm.value; // Get the value from the form
      this.walletService.stake(stakeAmount, this.token).subscribe({
        next: (response:any) => {
          console.log("response",response);
          
          this.toastr.success(response.body.message, '', {
            toastClass: 'toast-custom toast-success',
            positionClass: 'toast-bottom-center',
            closeButton: false,
            timeOut: 3000,
            progressBar: true
          });
          this.fetchWalletTransactions(this.page, this.sizePerPage); // Refresh transactions after deposit
          this.getUserData()
          this.stakeForm.reset()
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

  fetchWalletTransactions(page: number, sizePerPage: number) {
    if (this.token) {
      this.walletService.getWalletTransactions(page, sizePerPage, this.transactionType, this.token).subscribe({
        next: (response) => {
          this.transactions = response.data.docs; // Adjust based on your response structure
          this.totalTransactions = response.total; // Assuming your response contains the total transaction count
          console.log(this.transactions);
        },
        error: (error) => {
          console.error('Error fetching wallet transactions:', error);
        }
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1; // MatPaginator pageIndex starts from 0
    this.sizePerPage = event.pageSize;
    this.fetchWalletTransactions(this.page, this.sizePerPage);
  }

}
