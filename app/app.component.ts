import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './documents.service';
import { Document } from './documents';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  documents: Document[]=[];
  error='';
  success='';
  title= 'documents';
  format='';
  type='';
  document: Document =  {author:'',title:'',nr_of_pages:0,type:'',format:''};
  showUpdateFormId: number | null = null;
  prevobj: any;
  curentobj: any;
  
  constructor(private documentsService: DocumentsService) {
  }
        
  ngOnInit() {
    this.getDocuments();
  }
        
  // getDocuments(): void {

  //   this.documentsService.getAll().subscribe(
  //     (data: Document[]) => {
  //       this.documents = data;
  //       this.success = 'successful retrieval of the list';
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.error = err.message;
  //     }
  //   );

  // }


  setFilterValues() {
    const documentTypeInput = document.getElementById('documentType') as HTMLInputElement;
    const documentFormatInput = document.getElementById('documentFormat') as HTMLInputElement;

    this.prevobj=this.curentobj;
    this.type = documentTypeInput.value;
    this.format = documentFormatInput.value;
    this.curentobj='format: '+this.format+' and type: '+this.type;
    this.getDocuments();
  }

  getDocuments(): void {

    this.documentsService.getAll(this.type,this.format).subscribe(
      (documents: Document[])=>{ this.documents = documents},

      (err) => (this.error = err.message)
      );
      

  }


  showUpdateForm(itemId: number) {
    this.showUpdateFormId = itemId;
  }

  addDocument(f: NgForm) {
    this.resetAlerts();
    this.documentsService.store(this.document).subscribe(
      (res: Document) => {
        // Update the list of cars
        this.documents.push(res)
        console.log(res);
        // Inform the user
        this.success = 'Created successfully';

        // Reset the form
        f.reset();
      },
      (err) => (this.error = err.message)
    );
}

resetAlerts() {
  this.error = '';
  this.success = '';
}


updateDocument(author: any, title: any, nr_of_pages: any,type: any, format: any,id:any) {
  this.resetAlerts();

  this.documentsService
    .update({ author: author.value, title: title.value, nr_of_pages: nr_of_pages.value, type: type.value, format: format.value, id: +id })
    .subscribe(
      (res) => {
        this.success = 'Updated successfully';
        window.location.reload();
      },
      (err) => (this.error = err.message)
    );
}

deleteDocument(id: number) {
  this.resetAlerts();
  const confirmation = window.confirm('Are you sure you want to delete this document?');
  if (confirmation) {
  this.documentsService.delete(id).subscribe(
    (res) => {
      this.documents = this.documents.filter(function (item) {
        return item['id'] && +item['id'] !== +id;
      });

      this.success = 'Deleted successfully';
    },
    (err) => (this.error = err)
  );
  }
}

}