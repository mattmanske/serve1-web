require 'test_helper'

class AffidavitsControllerTest < ActionController::TestCase
  setup do
    @affidavit = affidavits(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:affidavits)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create affidavit" do
    assert_difference('Affidavit.count') do
      post :create, affidavit: { caption_type: @affidavit.caption_type, court: @affidavit.court, service_id: @affidavit.service_id, state_id: @affidavit.state_id, url: @affidavit.url }
    end

    assert_redirected_to affidavit_path(assigns(:affidavit))
  end

  test "should show affidavit" do
    get :show, id: @affidavit
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @affidavit
    assert_response :success
  end

  test "should update affidavit" do
    patch :update, id: @affidavit, affidavit: { caption_type: @affidavit.caption_type, court: @affidavit.court, service_id: @affidavit.service_id, state_id: @affidavit.state_id, url: @affidavit.url }
    assert_redirected_to affidavit_path(assigns(:affidavit))
  end

  test "should destroy affidavit" do
    assert_difference('Affidavit.count', -1) do
      delete :destroy, id: @affidavit
    end

    assert_redirected_to affidavits_path
  end
end
