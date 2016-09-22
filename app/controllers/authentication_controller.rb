class AuthenticationController < Devise::SessionsController

  respond_to :json, only: [:create]
  skip_before_action :allow_params_authentication!, only: :create

  def new
    user = User.new(sign_in_params)
    clean_up_passwords(user)

    render react_component: 'FormWrapper', props: {
      :type     => 'login',
      :path     => session_path(:user),
      :resource => user,
      :errors   => user.errors.class
    }
  end

  def create
    user = User.find_for_database_authentication(email: params[:user][:email])
    is_valid = user.try(:valid_password?, params[:user][:password])

    if is_valid
      sign_in(:user, user)
      render json: { user: user, redirect: organization_root_url() }
    else
      invalid_login_attempt
    end
  end

  private

  def invalid_login_attempt
    render json: { global: 'Username or password are incorrect.', user: { email: '', password: '' } }, status: :unauthorized
  end
end
