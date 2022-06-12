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

export const copySelector = selector => {
  return {
    0: { // StartTimeForm
      periods: selector['0'].periods,
      specific: selector['0'].specific,
      minTime: selector['0'].minTime,
      maxTime: selector['0'].maxTime,
    },
    5: { // Duration
      durationRange: selector['5'].durationRange,
    },
    6: { // Reasons
      reasons: selector['6'].reasons,
    },
    7: { // Sexes
      sexes: [
        'male',
        'female',
      ],
      selectedSexes: selector['7'].selectedSexes,
    },
    8: {
      ageRange: selector['8'].ageRange, // Age range
    },
    9: { // Income
      incomeBracket: selector['9'].incomeBracket, // array com checkboxes marcados
      incomeInterval: selector['9'].incomeBracket,
      mode: selector['9'].mode,
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
      periods: selector['17'].periods,
      specific: selector['17'].specific,
      minTime: selector['17'].minTime,
      maxTime: selector['17'].maxTime,
    },
  };
};

export default selectors;