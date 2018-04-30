import { Component, OnInit } from '@angular/core';
import { PasswordManagerCategories, PasswordManagerCategoriesEntry } from '../../dataTypes/categories';
import { DataService } from '../../services/data.service';
import { LoginDataType } from '../../dataTypes/login';
import { LoginService }  from '../../services/login.service';
import { Crypter } from '../../crypter/crypter';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  changePasswordEntries:PasswordManagerCategoriesEntry[];
  importedPasswordEntries:PasswordManagerCategoriesEntry[];
  exportPasswordEntries:PasswordManagerCategories[];
  oldPassword:string;
  newPassword:string;
  newPasswordRepeat:string;
  backupPassword:string;
  importedData:string;

  exportBackupPlainText:boolean;
  importBackupPlainText:boolean;
  private crypt:Crypter = new Crypter();
  theImportedObject:PasswordManagerCategories[];


  updatePassword()
  {
    if (this.oldPassword == this.loginService.loggedUser.password)
    {
      if (this.newPassword == this.newPasswordRepeat)
      {
        this.changePasswordEntries = [];
        for (var i = 0; i<this.dataService.AllCategories.length; i++)
        {
          for (var x = 0; x < this.dataService.AllCategories[i].entries.length; x++)
          {
            var obj = Object.assign({}, this.dataService.AllCategories[i].entries[x]);
            this.changePasswordEntries.push(obj);
          }
        }

        for (var i = 0; i < this.changePasswordEntries.length; i++)
        {
          if (this.changePasswordEntries[i].username.length > 0)
            this.changePasswordEntries[i].username = this.crypt.X_Crypt_String(this.crypt.X_DeCrypt_String(this.changePasswordEntries[i].username, this.loginService.loggedUser.password, true), this.newPassword, true);

          if (this.changePasswordEntries[i].password.length > 0)
            this.changePasswordEntries[i].password = this.crypt.X_Crypt_String(this.crypt.X_DeCrypt_String(this.changePasswordEntries[i].password, this.loginService.loggedUser.password, true), this.newPassword, true);

          if (this.changePasswordEntries[i].other.length > 0)
            this.changePasswordEntries[i].other = this.crypt.X_Crypt_String(this.crypt.X_DeCrypt_String(this.changePasswordEntries[i].other, this.loginService.loggedUser.password, true), this.newPassword, true);
        }

        this.loginService.changePasswordRequest(this.oldPassword, this.newPassword, this.changePasswordEntries).subscribe(
          data => {
            this.loginService.loggedUser = data.body;
            this.dataService.updateCategoriesData();
            alert("Password upgraded");
          },
          error => 
          {
            console.log(error);
          }
        );
      }
      else
      {
        alert("New password and new password repeat missmatch!");
      }
    }
    else
    {
      alert("Old password is not correct!");
    }
  }

  downloadBackup()
  {
    var sJson;
    if (this.exportBackupPlainText == true)
    {
      this.exportPasswordEntries = JSON.parse(JSON.stringify( this.dataService.AllCategories ));
      for (var i = 0; i<this.exportPasswordEntries.length; i++)
      {
        for (var x = 0; x < this.exportPasswordEntries[i].entries.length; x++)
        {
          this.exportPasswordEntries[i].entries[x].username = this.crypt.X_DeCrypt_String(this.exportPasswordEntries[i].entries[x].username, this.loginService.loggedUser.password, true);
          this.exportPasswordEntries[i].entries[x].password = this.crypt.X_DeCrypt_String(this.exportPasswordEntries[i].entries[x].password, this.loginService.loggedUser.password, true);
         this.exportPasswordEntries[i].entries[x].other = this.crypt.X_DeCrypt_String(this.exportPasswordEntries[i].entries[x].other, this.loginService.loggedUser.password, true);
        }
      }
      sJson = JSON.stringify(this.exportPasswordEntries);
    }
    else
    {
      sJson = JSON.stringify(this.dataService.AllCategories);
    }

    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "backup.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // you can perform an action with readed data here

        this.theImportedObject = JSON.parse(myReader.result);
        console.log(myReader.result);

        this.importedPasswordEntries = [];
        for (var i = 0; i<this.theImportedObject.length; i++)
        {
          for (var x = 0; x < this.theImportedObject[i].entries.length; x++)
          {
            var obj = Object.assign({}, this.theImportedObject[i].entries[x]);
            this.importedPasswordEntries.push(obj);
          }
        }
    }

    myReader.readAsText(file);
  }

  importBackup()
  {
      if (this.backupPassword.length > 0 &&
          this.importedPasswordEntries.length > 0)
      {
        if (confirm('All the data will be overwritten, are you sure you want to continue?'))
        {

          if (this.importBackupPlainText == true)
          {
              for (var x = 0; x < this.importedPasswordEntries.length; x++)
              {
                this.importedPasswordEntries[x].username = this.crypt.X_Crypt_String(this.importedPasswordEntries[x].username, this.backupPassword, true);
                this.importedPasswordEntries[x].password = this.crypt.X_Crypt_String(this.importedPasswordEntries[x].password, this.backupPassword, true);
                this.importedPasswordEntries[x].other    = this.crypt.X_Crypt_String(this.importedPasswordEntries[x].other, this.backupPassword, true);
              }
          }

          this.loginService.backupImportRequest(this.backupPassword, this.importedPasswordEntries).subscribe(
            data => {
              this.loginService.loggedUser = data.body;
              this.dataService.updateCategoriesData();
              alert("Backup imported with success!");
            },
            error => 
            {
              console.log(error);
            }
          );
        }
      }
      else
      {
        alert("To import a backup load a valid backup file and type the correct backup password.");
      }
  }
  constructor(private dataService: DataService, private loginService: LoginService) {   
  }

  ngOnInit() {
  }

}
