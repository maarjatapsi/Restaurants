import {render} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

// Unit tests
describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;
  let context;

  // Jest mock function mocking restaurant list
  const renderWithProps = (propOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    context = render(<RestaurantList {...props} />);
  };

  // Load restaurants on first render
  it('loads restaurants on first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });
  it('does not display the loading indicator while not loading', () => {
    renderWithProps();
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).toBeNull();
  });
  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });
    it('does not display the loading indicator while not loading', () => {
      const {queryByTestId} = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });
    it('does not display the error message', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurants could not be loaded.')).toBeNull();
    });
    it('displays the restaurants', () => {
      const {queryByText} = context;

      expect(queryByText('Sushi Place')).not.toBeNull();
      expect(queryByText('Pizza Place')).not.toBeNull();
    });
  });
  describe('when loading fails', () => {
    beforeEach(() => {
      renderWithProps({loadError: true});
    });
    it('displays the error message', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurants could not be loaded.')).not.toBeNull();
    });
  });
});
