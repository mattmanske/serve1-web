class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [
        :email,
        :first_name,
        :last_name,
        :password,
        :password_confirmation,
        { organization_attributes: [ :name, :subdomain, :address, :state_id, :county_id, :phone, :email ] }
      ]
    )

    devise_parameter_sanitizer.permit(
      :account_update,
      keys: [
        :email,
        :password,
        :current_password,
        :password_confirmation,
        { user_data_attributes: [ :id, :first_name, :last_name ] },
        { organization_attributes: [ :id, :name, :address, :state_id, :county_id, :phone, :email ] }
      ]
    )
  end

  private

  def after_sign_in_path_for(resource)
    dashboard_index_url(subdomain: resource.organization.subdomain)
  end

  def after_sign_out_path_for(resource)
    root_url(subdomain: false)
  end
end
