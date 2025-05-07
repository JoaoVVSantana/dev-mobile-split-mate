import { TEvent } from '~/types/TEvent';
import { IExpenseParticipant } from '~/types/IExpenseParticipant';
import { useCommunityStore } from '~/store/useCommunityStore';
import { TFriend } from '~/types/TFriend';

const getParticipants = (): TFriend[] => {
  const friends = useCommunityStore.getState().friends;
  return friends.map(friend => ({ ...friend, debts: [] }));
};

export const EventService = {

  async getAll(): Promise<TEvent[]> {
    const participants: TFriend[] = getParticipants()
    const events: TEvent[] = [
      {
        id: '1',
        title: 'Carnaval',
        date: '10/02/2025',
        participants,
        expenses: [
          {
            id:'1',
            name: 'Beats',
            value: 75.90,
            isPayed: false,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
          {
            id:'2',
            name: 'Uber',
            value: 43.80,
            isPayed: true,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '2',
        title: 'Churrasco',
        date: '15/03/2025',
        participants,
        expenses: [
          {
            id:'3',
            name: 'Carvão',
            value: 20.00,
            isPayed: false,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'3',
            name: 'Carne',
            value: 120.00,
            owner:{
              id:'4',
              name:'Murilo'
            },
            isPayed: participants.every((_, i) => i !== 2),
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i !== 2,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '3',
        title: 'Festa de Aniversário',
        date: '20/04/2025',
        participants,
        expenses: [
          {
            id:'4',
            name: 'Bolo',
            value: 50.00,
            isPayed: false,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'5',
            name: 'Refrigerante',
            value: 30.00,
            isPayed: true,
            owner:{
              id:'3',
              name:'Maria'
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '4',
        title: 'Viagem de Férias',
        date: '01/07/2025',
        participants,
        expenses: [
          {
            id:'6',
            name: 'Passagem Aérea',
            value: 500.00,
            isPayed: false,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'7',
            name: 'Hotel',
            value: 1000.00,
            isPayed: true,
            owner:{
              id:'3',
              name:'Maria'
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '5',
        title: 'Jantar de Natal',
        date: '25/12/2025',
        participants,
        expenses: [
          {
            id:'8',
            name: 'Peru',
            value: 200.00,
            isPayed: false,
            owner:{
              id:'4',
              name:'Murilo'
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'9',
            name: 'Vinho',
            value: 100.00,
            isPayed: true,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '6',
        title: 'Festa de Réveillon',
        date: '31/12/2025',
        participants,
        expenses: [
          {
            id:'10',
            name: 'Fogos de Artifício',
            value: 150.00,
            isPayed: false,
            owner:{
              id:'3',
              name:'Maria'
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'11',
            name: 'Champanhe',
            value: 80.00,
            isPayed: true,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '7',
        title: 'Festa de Halloween',
        date: '31/10/2025',
        participants,
        expenses: [
          {
            id:'12',
            name: 'Doces',
            value: 50.00,
            isPayed: false,
            owner:{
              id:'4',
              name:'Murilo'
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'13',
            name: 'Fantasia',
            value: 200.00,
            isPayed: true,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '8',
        title: 'Festa de São João',
        date: '24/06/2025',
        participants,
        expenses: [
          {
            id:'14',
            name: 'Milho Verde',
            value: 30.00,
            isPayed: false,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'15',
            name: 'Bandeirinhas',
            value: 20.00,
            isPayed: true,
            owner:{
              id:'3',
              name:'Maria'
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '9',
        title: 'Festa de São Valentim',
        date: '14/02/2025',
        participants,
        expenses: [
          {
            id:'16',
            name: 'Flores',
            value: 100.00,
            isPayed: false,
            owner:{
              id:'4',
              name:'Murilo'
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'17',
            name: 'Jantar Romântico',
            value: 200.00,
            isPayed: true,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '10',
        title: 'Festa de Ação de Graças',
        date: '28/11/2025',
        participants,
        expenses: [
          {
            id:'18',
            name: 'Peru Assado',
            value: 300.00,
            isPayed: false,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'19',
            name: 'Purê de Batata',
            value: 50.00,
            isPayed: true,
            owner:{
              id:'3',
              name:'Maria'
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '11',
        title: 'Festa de São Patrício',
        date: '17/03/2025',
        participants,
        expenses: [
          {
            id:'20',
            name: 'Cerveja',
            value: 150.00,
            isPayed: false,
            owner:{
              id:'4',
              name:'Murilo'
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'21',
            name: 'Comida Típica',
            value: 200.00,
            isPayed: true,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '12',
        title: 'Festa de São Jorge',
        date: '23/04/2025',
        participants,
        expenses: [
          {
            id:'22',
            name: 'Bolo de São Jorge',
            value: 80.00,
            isPayed: false,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'23',
            name: 'Decoração',
            value: 120.00,
            isPayed: true,
            owner:{
              id:'3',
              name:'Maria'
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '13',
        title: 'Festa de São Miguel',
        date: '29/09/2025',
        participants,
        expenses: [
          {
            id:'24',
            name: 'Comida Típica',
            value: 200.00,
            isPayed: false,
            owner:{
              id:'4',
              name:'Murilo'
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'25',
            name: 'Bebidas',
            value: 150.00,
            isPayed: true,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
    ];

    return events;
  },

  async getById(id: string): Promise<TEvent> {
    const all = await this.getAll();
    const found = all.find(e => e.id === id);
    if (!found) throw new Error('Evento não encontrado');
    return found;
  },
};
