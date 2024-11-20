import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from 'src/app/services/auth/auth-services.service';
import { TreeNode } from 'primeng/api'; // Import TreeNode from PrimeNG

interface TreCustomTreeNode extends TreeNode {
  label: string;
  referralCode?: string;  // Add referralCode property to the node
  children: TreeNode[];
  icon?: string;  // Add the icon property
}
@Component({
  selector: 'app-network-tree',
  templateUrl: './network-tree.component.html',
  styleUrls: ['./network-tree.component.scss']
})
export class NetworkTreeComponent {
  token: any;
  nodes: any[] = [];
  selectedReferral: any 
  constructor(private authService: AuthServicesService,
    private toastr: ToastrService,) {

  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');

    this.getRefrralTreeData()

  }


  getRefrralTreeData() {

    this.authService.getReferralList(this.token).subscribe({
      next: (apiResponse) => {
        this.nodes = this.transformDataToTree(apiResponse.data);
      },
      error: (err) => {

      }

    })

  }

  transformDataToTree(data: any): TreCustomTreeNode[] {
    const nodes: TreCustomTreeNode[] = [];
    
    // Loop through the data entries
    for (const [key, value] of Object.entries(data)) {
      // Create a node for each entry
      const node: TreCustomTreeNode = {
        label: key,  // Set the label of the node (e.g., Prakash kumar-R8XXYM0C- Total Team : 36)
        referralCode: key.split('-')[1],  // Extract the referral code (e.g., R8XXYM0C)
        children: [],  // Initialize an empty children array
        icon: 'pi pi-user'  // Set a default icon (you can customize this logic)
      };
  
      // If there are child nodes (nested data), recursively transform them
      if (value && typeof value === 'object') {
        node.children = this.transformDataToTree(value);  // Recursively handle nested data
      }
  
      // Push the node to the nodes array
      nodes.push(node);
      console.log("the node data is" ,nodes );
      
    }
  
    return nodes;  // Return the transformed tree nodes
  }
  
  
  
  onNodeSelect(event: any): void {
    console.log("Node clicked:", event);  // Access the node data using event.node
    
    const node = event.node;  // Get the clicked node from event.node
    if (node) {
      this.getReferralInfo(node.referralCode);  // Fetch referral info using referralCode
    }
  }
  doSomething(event:any, item:any){      
    event.stopPropagation();
    // as before you had
 }

  getReferralInfo(referralCode: string): void {
    this.authService.getReferralInfomation(referralCode, this.token).subscribe({
      next: (response: any) => {
        this.selectedReferral = response.data

        console.log('Referral Info:', response.data);
        // Process the referral information as needed
      },
      error: (err) => {
        console.error('Failed to retrieve referral info', err);
        this.toastr.error('Failed to retrieve referral data');
      }
    });
  }
}
