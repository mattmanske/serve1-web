class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :enforce_subdomains
  before_action :configure_permitted_parameters, if: :devise_controller?

  def default_url_options
    { subdomain: user_signed_in? ? current_user.tenant : 'www' }
  end

  protected

  def enforce_subdomains
    tenant = user_signed_in? ? current_user.tenant : 'www'
    redirect_to(subdomain: tenant) unless request.subdomain == tenant
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [
        :name,
        :email,
        :password,
        :password_confirmation,
        { organization_attributes: [ :name, :subdomain, :address, :state_id, :county_id, :phone, :email ] }
      ]
    )

    devise_parameter_sanitizer.permit(
      :account_update,
      keys: [
        :name,
        :email,
        :password,
        :current_password,
        :password_confirmation,
        { organization_attributes: [ :id, :name, :address, :state_id, :county_id, :phone, :email ] }
      ]
    )
  end

  private

  def after_sign_in_path_for(resource)
    organization_root_url()
  end

  def after_sign_out_path_for(resource)
    root_url()
  end
end
