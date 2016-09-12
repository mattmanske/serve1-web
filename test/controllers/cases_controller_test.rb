require 'test_helper'

class CasesControllerTest < ActionController::TestCase
  setup do
    @case = cases(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cases)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create case" do
    assert_difference('Case.count') do
      post :create, case: { client_contact_id: @case.client_contact_id, client_id: @case.client_id, county_id: @case.county_id, court_type: @case.court_type, defendant: @case.defendant, defendant_et_al: @case.defendant_et_al, key: @case.key, plantiff: @case.plantiff, plantiff_et_al: @case.plantiff_et_al, state_id: @case.state_id }
    end

    assert_redirected_to case_path(assigns(:case))
  end

  test "should show case" do
    get :show, id: @case
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @case
    assert_response :success
  end

  test "should update case" do
    patch :update, id: @case, case: { client_contact_id: @case.client_contact_id, client_id: @case.client_id, county_id: @case.county_id, court_type: @case.court_type, defendant: @case.defendant, defendant_et_al: @case.defendant_et_al, key: @case.key, plantiff: @case.plantiff, plantiff_et_al: @case.plantiff_et_al, state_id: @case.state_id }
    assert_redirected_to case_path(assigns(:case))
  end

  test "should destroy case" do
    assert_difference('Case.count', -1) do
      delete :destroy, id: @case
    end

    assert_redirected_to cases_path
  end
end
