require 'test_helper'

class ServicesControllerTest < ActionController::TestCase
  setup do
    @service = services(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:services)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create service" do
    assert_difference('Service.count') do
      post :create, service: { attempts: @service.attempts, job_id: @service.job_id, mileage: @service.mileage, notes: @service.notes, party_id: @service.party_id, payment: @service.payment, person_capacity: @service.person_capacity, person_name: @service.person_name, person_title: @service.person_title, service_date: @service.service_date, service_type: @service.service_type, status: @service.status }
    end

    assert_redirected_to service_path(assigns(:service))
  end

  test "should show service" do
    get :show, id: @service
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @service
    assert_response :success
  end

  test "should update service" do
    patch :update, id: @service, service: { attempts: @service.attempts, job_id: @service.job_id, mileage: @service.mileage, notes: @service.notes, party_id: @service.party_id, payment: @service.payment, person_capacity: @service.person_capacity, person_name: @service.person_name, person_title: @service.person_title, service_date: @service.service_date, service_type: @service.service_type, status: @service.status }
    assert_redirected_to service_path(assigns(:service))
  end

  test "should destroy service" do
    assert_difference('Service.count', -1) do
      delete :destroy, id: @service
    end

    assert_redirected_to services_path
  end
end
