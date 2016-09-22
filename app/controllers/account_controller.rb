class AccountController < Devise::RegistrationsController
  include ApplicationHelper

  respond_to :json, only: [:create]
  skip_before_filter :verify_authenticity_token, only: [:create]

  def new
    user = User.new().build_organization
    states = select_format State.where(id: 60)
    counties = select_format County.where(state: 60).order(:name)

    render react_component: 'FormWrapper', props: {
      :type       => 'registration',
      :path       => registration_path(:user),
      :resource   => user,
      :selections => { states: states, counties: counties },
      :errors     => user.errors.class
    }
  end

  def create
    org = Organization.create(organization_params)
    user = User.new(account_params)

    user.organization = org
    user.save

    if user.errors.any? || org.errors.any?
      render json: { user: user.errors, organization: org.errors }, status: :unprocessable_entity
    else
      sign_in(:user, user)
      render json: { user: user, redirect: organization_root_url( welcome: true ) }
    end
  end

  private

  def account_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end

  def organization_params
    params.require(:organization).permit(:name, :subdomain, :state_id, :county_id)
  end
end
