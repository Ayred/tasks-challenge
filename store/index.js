export const state = () => {
  return {
    taskDetails: [],
    refreshTasks: false,
  };
};

export const mutations = {
  updateRefreshTasks: (state, value) => {
    state.refreshTasks = value;
  },
};
