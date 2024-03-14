export const Surveys = [
  {
    id: 1,
    title: 'Survey 1',
    description: 'This is the first survey',
    category: 'Busines',
    questions: [
      {
        id: 1,
        question: 'What is your favorite color?',
        options: [
          {
            id: 1,
            option: 'Red',
          },
          {
            id: 2,
            option: 'Blue',
          },
          {
            id: 3,
            option: 'Green',
          },
        ],
      },
      {
        id: 2,
        question: 'What is your favorite food?',
        options: [
          {
            id: 1,
            option: 'Pizza',
          },
          {
            id: 2,
            option: 'Burger',
          },
          {
            id: 3,
            option: 'Pasta',
          },
        ],
      },
      {
        id: 3,
        question: 'What is your favorite animal?',
        options: [
          {
            id: 1,
            option: 'Dog',
          },
          {
            id: 2,
            option: 'Cat',
          },
          {
            id: 3,
            option: 'Bird',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Survey 2',
    description: 'This is the second survey',
    category: 'Systems',
    questions: [
      {
        id: 1,
        question: 'What is your favorite color?',
        options: [
          {
            id: 1,
            option: 'Red',
          },
          {
            id: 2,
            option: 'Blue',
          },
          {
            id: 3,
            option: 'Green',
          },
        ],
      },
      {
        id: 2,
        question: 'What is your favorite food?',
        options: [
          {
            id: 1,
            option: 'Pizza',
          },
          {
            id: 2,
            option: 'Burger',
          },
          {
            id: 3,
            option: 'Pasta',
          },
        ],
      },
    ],
  },
];

export type Survey = (typeof Surveys)[number];
