import { Component } from '@angular/core';

@Component({
  selector: 'app-publicpots',
  templateUrl: './publicpots.component.html',
  styleUrls: ['./publicpots.component.css']
})
export class PublicpotsComponent {

  pots = [
    {
      title: 'Pot 1',
      description: 'Description for Pot 1',
      amount: 100,
      targetAmount: 500,
      nbrContributor: 10,
      deadlineDate: new Date('2023-12-31'),
      imgSrc: 'https://picsum.photos/id/103/800/450'
    },
    {
      title: 'Pot 2',
      description: 'Description for Pot 2',
      amount: 200,
      targetAmount: 1000,
      nbrContributor: 20,
      deadlineDate: new Date('2024-01-31'),
      imgSrc: 'https://picsum.photos/id/1005/800/450'
    },
    {
      title: 'Pot 2',
      description: 'Description for Pot 2',
      amount: 200,
      targetAmount: 1000,
      nbrContributor: 20,
      deadlineDate: new Date('2024-01-31'),
      imgSrc: 'https://picsum.photos/id/1011/800/450'
    },
    {
      title: 'Pot 2',
      description: 'Description for Pot 2',
      amount: 200,
      targetAmount: 1000,
      nbrContributor: 20,
      deadlineDate: new Date('2024-01-31'),
      imgSrc: 'https://picsum.photos/id/1011/800/450'
    },
    ];

}
