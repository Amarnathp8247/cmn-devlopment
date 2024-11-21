import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from 'src/app/services/auth/auth-services.service';
import { WalletServiceService } from 'src/app/services/wallet/wallet-service.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  withdrawForm: FormGroup;
  token: any;
  showWithdrawPassword = false;
  page = 1;
  sizePerPage = 10;
  transactionType = 'WITHDRAW';
  transactions: any = [];
  totalTransactions: number = 0;
  loading = false;
  userBlance: any;

  constructor(
    private walletService: WalletServiceService,
    private fb: FormBuilder, // Inject FormBuilder
    private toastr: ToastrService,
    private authServices: AuthServicesService
  ) {
    // Initialize the form groups in the constructor
<<<<<<< HEAD

=======
>>>>>>> 8aa6010272a7527c7cf77cf1dc72c15d30693fc2
    this.withdrawForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      password: ['', [Validators.required]],
    });
<<<<<<< HEAD

=======
>>>>>>> 8aa6010272a7527c7cf77cf1dc72c15d30693fc2
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    // this.fetchWalletTransactions(this.page, this.sizePerPage);
    this.getUserData()
  }

<<<<<<< HEAD


  getUserData() {

    this.authServices.getProfile(this.token).subscribe({
      next: (response) => {


        this.userBlance = response.data.BUSDBalance
        // this.totalInternalTransferBalance = response.data.totalInternalTransferBalance

=======
  getUserData() {
    this.authServices.toggleLoader(true);
    this.authServices.getProfile(this.token).subscribe({
      next: (response) => {
        this.userBlance = response.data.BUSDBalance
        // this.totalInternalTransferBalance = response.data.totalInternalTransferBalance
        this.authServices.toggleLoader(false);
>>>>>>> 8aa6010272a7527c7cf77cf1dc72c15d30693fc2
      },
      error: (error) => {
        this.toastr.error('Failed to load profile information', 'Error');
        this.authServices.toggleLoader(false);
      }
    });
  }
  withdraw() {
    if (this.withdrawForm.valid) {
      this.authServices.toggleLoader(true);
      const withdrawAmount = this.withdrawForm.value; // Get the value from the form
      this.walletService.withdraw(withdrawAmount, this.token).subscribe({
        next: (response) => {
          this.toastr.success(response.body.message, '', {
            toastClass: 'toast-custom toast-success',
            positionClass: 'toast-bottom-center',
            closeButton: false,
            timeOut: 3000,
            progressBar: true
          });
<<<<<<< HEAD
          this.getUserData()
=======
>>>>>>> 8aa6010272a7527c7cf77cf1dc72c15d30693fc2
          this.withdrawForm.reset();
          this.authServices.toggleLoader(false);
        },
        error: (err) => {
          this.authServices.toggleLoader(false);
          const errorMessage = err.error?.message || 'Error validating referral code';
<<<<<<< HEAD

=======
>>>>>>> 8aa6010272a7527c7cf77cf1dc72c15d30693fc2
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
<<<<<<< HEAD

  // fetchWalletTransactions(page: number, sizePerPage: number) {
  //   if (this.token) {
  //     this.walletService.getWalletTransactions(page, sizePerPage, this.transactionType, this.token).subscribe({
  //       next: (response) => {
  //         this.transactions = response.data.docs; // Adjust based on your response structure
  //         this.totalTransactions = response.total; // Assuming your response contains the total transaction count
  //         console.log(this.transactions);
  //       },
  //       error: (error) => {
  //         console.error('Error fetching wallet transactions:', error);
  //       }
  //     });
  //   }
  // }

  // onPageChange(event: PageEvent): void {
  //   this.page = event.pageIndex + 1; // MatPaginator pageIndex starts from 0
  //   this.sizePerPage = event.pageSize;
  //   this.fetchWalletTransactions(this.page, this.sizePerPage);
  // }


=======

>>>>>>> 8aa6010272a7527c7cf77cf1dc72c15d30693fc2
}
