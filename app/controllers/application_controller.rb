class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :enforce_subdomains
  before_action :configure_permitted_parameters, if: :devise_controller?

  def default_serializer_options
    { root: false }
  end

  def default_url_options
    { subdomain: user_signed_in? ? current_user.tenant : 'www' }
  end

  def default_state
    user_signed_in? ? current_user.organization.state_id || nil : nil
  end

  def default_county
    user_signed_in? ? current_user.organization.county_id || nil : nil
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
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation,
        { organization_attributes: [ :name, :subdomain, :address, :state_id, :county_id ] }
      ]
    )

    devise_parameter_sanitizer.permit(
      :account_update,
      keys: [
        :first_name,
        :last_name,
        :email,
        :password,
        :current_password,
        :password_confirmation,
        { organization_attributes: [ :id, :name, :address, :state_id, :county_id ] }
      ]
    )
  end

private

  def form_repsonse(props)
    respond_to do |format|
      format.html { render react_component: 'FormWrapper', props: props }
      format.json { render :json => props }
    end
  end

  def select_format(objects, value = 'id', name = 'name')
    objects.map { |elem| { value: elem.send(value), label: elem.send(name) } }
  end

  def after_sign_in_path_for(resource)
    organization_root_url()
  end

  def after_sign_out_path_for(resource)
    root_url()
  end
end
