import { AxiosRequestHeaders } from 'axios';

interface IReqConfig {
  baseURL?: string;
  headers?: AxiosRequestHeaders;
  url: string;
}

export interface IURLDictionary {
  [key: string]: {
    DEFAULT: IReqConfig;
    [key: string]: IReqConfig;
  };
}

export const COMMON_REQ_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const URL_DICTIONARY: IURLDictionary = {
  // Events
  GET_EVENTS: {
    DEFAULT: {
      url: '/events',
    },
  },
  GET_EVENT_BY_ID: {
    DEFAULT: {
      url: '/events/:id',
    },
  },
  POST_EVENT: {
    DEFAULT: {
      url: '/events',
    },
  },
  PUT_EVENT: {
    DEFAULT: {
      url: '/events/:id',
    },
  },
  DELETE_EVENT: {
    DEFAULT: {
      url: '/events/:id',
    },
  },

  // Expenses
  GET_EXPENSES: {
    DEFAULT: {
      url: '/expenses',
    },
  },
  GET_EXPENSE_BY_ID: {
    DEFAULT: {
      url: '/expenses/:id',
    },
  },
  POST_EXPENSE: {
    DEFAULT: {
      url: '/expenses',
    },
  },
  PUT_EXPENSE: {
    DEFAULT: {
      url: '/expenses/:id',
    },
  },
  DELETE_EXPENSE: {
    DEFAULT: {
      url: '/expenses/:id',
    },
  },
  PUT_EXPENSE_PAYMENT_STATUS: {
    DEFAULT: {
      url: '/expenses/:id/participants/:participantId/payment-status',
    },
  },

  // Friends
  GET_FRIENDS: {
    DEFAULT: {
      url: '/friends',
    },
  },
  GET_FRIEND_BY_ID: {
    DEFAULT: {
      url: '/friends/:id',
    },
  },
  POST_FRIEND: {
    DEFAULT: {
      url: '/friends',
    },
  },
  PUT_FRIEND: {
    DEFAULT: {
      url: '/friends/:id',
    },
  },
  DELETE_FRIEND: {
    DEFAULT: {
      url: '/friends/:id',
    },
  },

  // Event Participants
  POST_EVENT_PARTICIPANT: {
    DEFAULT: {
      url: '/events/:eventId/participants/:friendId',
    },
  },
  DELETE_EVENT_PARTICIPANT: {
    DEFAULT: {
      url: '/events/:eventId/participants/:friendId',
    },
  },

  // Expense Participants
  POST_EXPENSE_PARTICIPANT: {
    DEFAULT: {
      url: '/expenses/:expenseId/participants/:friendId',
    },
  },
  DELETE_EXPENSE_PARTICIPANT: {
    DEFAULT: {
      url: '/expenses/:expenseId/participants/:friendId',
    },
  },
}; 