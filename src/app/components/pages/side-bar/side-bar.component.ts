import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  isSidebarCollapsed = false;
  isDarkMode = false;
  
  constructor(private router: Router){}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleDarkMode(isDark: any) {
    this.isDarkMode = isDark;
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Reference to the sidebar element
  @ViewChild('sidebar', { static: false }) sidebar: ElementRef | undefined;

  // Reference to the button element
  @ViewChild('toggleButton', { static: false }) toggleButton: ElementRef | undefined;

  

  // Close sidebar if click happens outside of it
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (
      this.sidebar &&
      !this.sidebar.nativeElement.contains(event.target) 
    ) {
      this.isSidebarCollapsed = false;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Retrieve token from local storage
    
      this.router.navigate(['/login']); // Redirect to login if token is not found
    
  }
}
