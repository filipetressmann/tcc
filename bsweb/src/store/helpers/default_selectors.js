const selectors = {
  main: {
    0: { // StartTimeForm
      periods: [],
      specific: false,
      minTime: new Date(2020, 1, 1, 4, 0, 0),
      maxTime: new Date(2020, 1, 1, 13, 0, 0),
    },
    5: { // Duration
      durationRange: [1, 180],
    },
    6: { // Reasons
      reasons: [],
    },
    7: { // Sexes
      sexes: [
        'male',
        'female',
      ],
      selectedSexes: [],
    },
    8: {
      ageRange: [1, 71], // Age range
    },
    9: { // Income
      incomeBracket: [], // array com checkboxes marcados
      incomeInterval: [0, 42916],
      mode: 'brackets',
      incomeBracketBounds: {
        1: {
          min: 0,
          max: 1908,
        },
        2: {
          min: 1908,
          max: 3816,
        },
        3: {
          min: 3816,
          max: 7632,
        },
        4: {
          min: 7632,
          max: 11488,
        },
        5: {
          min: 11448,
          max: 42916,
        },
      },
    },
    17: { // FinishTimeForm
      periods: [],
      specific: false,
      minTime: new Date(2020, 1, 1, 4, 0, 0),
      maxTime: new Date(2020, 1, 1, 13, 0, 0),
    },
  },
  second: {
    0: { // StartTimeForm
      periods: [],
      specific: false,
      minTime: new Date(2020, 1, 1, 4, 0, 0),
      maxTime: new Date(2020, 1, 1, 13, 0, 0),
    },
    5: { // Duration
      durationRange: [1, 180],
    },
    6: { // Reasons
      reasons: [],
    },
    7: { // Sexes
      sexes: [
        'male',
        'female',
      ],
      selectedSexes: [],
    },
    8: {
      ageRange: [1, 71], // Age range
    },
    9: { // Income
      incomeBracket: [], // array com checkboxes marcados
      incomeInterval: [0, 42916],
      mode: 'brackets',
      incomeBracketBounds: {
        1: {
          min: 0,
          max: 1908,
        },
        2: {
          min: 1908,
          max: 3816,
        },
        3: {
          min: 3816,
          max: 7632,
        },
        4: {
          min: 7632,
          max: 11488,
        },
        5: {
          min: 11448,
          max: 42916,
        },
      },
    },
    17: { // FinishTimeForm
      periods: [],
      specific: false,
      minTime: new Date(2020, 1, 1, 4, 0, 0),
      maxTime: new Date(2020, 1, 1, 13, 0, 0),
    },
  },
};

export default selectors;