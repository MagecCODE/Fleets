import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Inventory } from 'src/app/models/inventoty.model';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { DotaService } from 'src/app/services/dota/dota.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline, trashOutline, playSkipBackOutline, chevronBackOutline, chevronForwardOutline, playSkipForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InventoryPage implements OnInit {
  private authService = inject(AuthService);
  private inventoryService = inject(InventoryService);
  private dotaService = inject(DotaService);
  
  
  inventory: Inventory[] = [];

  // Pagination & Search
  currentPage: number = 1;
  itemsPerPage: number = 12;
  searchTerm: string = '';

  selectedIds: Set<number> = new Set<number>();
  
  isAddAlertOpen = false;
  isDeleteAlertOpen = false;

  newItem = {
    unitfleet: 101,
    dni_emp: '12345678A',
    item_name: '',
    quantity: 1,
    status: 'Stock'
  };

  constructor(private navCtrl: NavController) {
        addIcons({ 
          'log-out-outline': logOutOutline,
          'trash-outline': trashOutline,
          'play-skip-back-outline': playSkipBackOutline,
          'chevron-back-outline': chevronBackOutline,
          'chevron-forward-outline': chevronForwardOutline,
          'play-skip-forward-outline': playSkipForwardOutline
        });
  }

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    // Load ALL inventory items for the list
    this.inventoryService.getInventary().subscribe({
      next: (data) => {
        this.inventory = data;
      },
      error: (err) => {
        console.error('Error loading inventory', err);
      }
    });

    const user = this.authService.getUser();
    const employeeId = this.authService.getEmployeeId();

    if (employeeId && user) {
      this.dotaService.getDotaByEmpID(employeeId).subscribe({
        next: (dotaResp) => {
          const dota = Array.isArray(dotaResp) ? dotaResp[0] : dotaResp;
          if (!dota || !dota.unitfleet) return;

          this.newItem.unitfleet = dota.unitfleet;
          this.newItem.dni_emp = user.dni; 
        },
        error: (err) => {
          console.error('Error loading dota info', err);
        }
      });
    }
  }

  toggleSelection(id: number) {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }

  get showDeleteButton(): boolean {
    return this.selectedIds.size > 0;
  }

  // Modal logic for adding
  addItem() {
    this.isAddAlertOpen = true;
  }

  cancelAdd() {
    this.isAddAlertOpen = false;
    this.resetNewItem();
  }

  resetNewItem() {
    const user = this.authService.getUser();
    const employeeId = this.authService.getEmployeeId();
    
    // We already have newItem.unitfleet saved from loadInventory, so map it from there.
    const currentUnitFleet = this.newItem.unitfleet || 101; 
    
    this.newItem = {
      unitfleet: currentUnitFleet, 
      dni_emp: user ? user.dni : '12345678A',
      item_name: '',
      quantity: 1,
      status: 'Stock'
    };
  }

  saveNewItem() {
    this.inventoryService.addInventoryItem(this.newItem).subscribe({
      next: (response) => {
        // Backend id returning logic or use math.random fallback if mock array
        const newId = response && response.id ? response.id : Math.floor(Math.random() * 1000) + 10;
        
        this.inventory.push(new Inventory(
          newId,
          this.newItem.unitfleet,
          this.newItem.dni_emp,
          this.newItem.item_name,
          this.newItem.quantity,
          this.newItem.status
        ));

        this.isAddAlertOpen = false;
        this.resetNewItem();
      },
      error: (err) => {
        console.error('Error adding inventory item', err);
      }
    });
  }

  deleteItems() {
    this.isDeleteAlertOpen = true;
  }

  cancelDelete() {
    this.isDeleteAlertOpen = false;
  }

  confirmDelete() {
    const idsToDelete = Array.from(this.selectedIds);
    let completed = 0;

    if (idsToDelete.length === 0) {
      this.isDeleteAlertOpen = false;
      return;
    }

    idsToDelete.forEach(id => {
      this.inventoryService.deleteInventoryItem(id).subscribe({
        next: () => {
          completed++;
          if (completed === idsToDelete.length) {
            this.selectedIds.clear();
            this.isDeleteAlertOpen = false;
            this.loadInventory(); // Refresh view
          }
        },
        error: (err) => {
          console.error(`Error deleting inventory item with id ${id}`, err);
          completed++;
          if (completed === idsToDelete.length) {
            this.selectedIds.clear();
            this.isDeleteAlertOpen = false;
            this.loadInventory(); // Refresh view even if some failed
          }
        }
      });
    });
  }

  // Search format logic
  get filteredInventory(): Inventory[] {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      return this.inventory;
    }
    const term = this.searchTerm.toLowerCase();
    return this.inventory.filter(item => {
      return (
        (item.item_name && item.item_name.toLowerCase().includes(term)) ||
        (item.status && item.status.toLowerCase().includes(term)) ||
        (item.quantity !== null && item.quantity !== undefined && item.quantity.toString().includes(term)) ||
        (item.unitfleet !== null && item.unitfleet !== undefined && item.unitfleet.toString().includes(term))
      );
    });
  }

  resetPagination() {
    this.currentPage = 1;
    this.selectedIds.clear();
  }

  // Pagination logic
  get paginatedInventory(): Inventory[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredInventory.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredInventory.length / this.itemsPerPage) || 1;
  }

  firstPage() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.selectedIds.clear();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.selectedIds.clear();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.selectedIds.clear(); // Option to clear selection on page change
    }
  }

  lastPage() {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.selectedIds.clear();
    }
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
