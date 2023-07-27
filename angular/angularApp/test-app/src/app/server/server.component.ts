import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'Active';

  getServerStatus() {
    return this.serverStatus;
  }
}
