require 'test_helper'

class AttemptsControllerTest < ActionController::TestCase
  setup do
    @attempt = attempts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:attempts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create attempt" do
    assert_difference('Attempt.count') do
      post :create, attempt: { address: @attempt.address, attempted_at: @attempt.attempted_at, mileage: @attempt.mileage, notes: @attempt.notes, organization_user_id: @attempt.organization_user_id, payment: @attempt.payment, service_id: @attempt.service_id, successful: @attempt.successful }
    end

    assert_redirected_to attempt_path(assigns(:attempt))
  end

  test "should show attempt" do
    get :show, id: @attempt
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @attempt
    assert_response :success
  end

  test "should update attempt" do
    patch :update, id: @attempt, attempt: { address: @attempt.address, attempted_at: @attempt.attempted_at, mileage: @attempt.mileage, notes: @attempt.notes, organization_user_id: @attempt.organization_user_id, payment: @attempt.payment, service_id: @attempt.service_id, successful: @attempt.successful }
    assert_redirected_to attempt_path(assigns(:attempt))
  end

  test "should destroy attempt" do
    assert_difference('Attempt.count', -1) do
      delete :destroy, id: @attempt
    end

    assert_redirected_to attempts_path
  end
end
