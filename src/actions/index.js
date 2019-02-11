import _ from "lodash";
import jsonPlaceholder from "./apis/jsonPlaceholder";

/*
fetchPostsAndUsers is... 
Another way of eliminating mutiple action creator events
from firing on componentDidMount() in the UserHeader Component.
UserId is an array of unique user ID's,
gathered by mapping over the original store, discarding any copied IDs, then call fetchUser();
passing in the remaining IDs.
*/
// const fetchPostsAndUsers = () => async (dispatch, getState) => {
//   await dispatch(fetchPosts());
//
//   const userId = _.chain(getState().posts)
//     .map("userId")
//     .uniq()
//     .forEach(id => dispatch(fetchUser(id)))
//     .value();
//
// };

const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};

const fetchUser = id => dispatch => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
});

export { fetchPosts, fetchUser };
