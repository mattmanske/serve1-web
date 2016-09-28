class AccountController < Devise::RegistrationsController
  skip_before_filter :verify_authenticity_token, only: [:create]

  respond_to :json, only: [:new, :create]

  def new
    @user = User.new().build_organization({ state_id: 60 })
    form_repsonse(form_props)
  end

  def create
    @org  = Organization.new(organization_params)
    @user = User.new(account_params)
    @user.organization = @org

    if @org.save && @user.save
      sign_in(:user, @user)
      OrganizationUser.create(user_id: @user.id).admin!
      render json: { resource: @user, redirect: organization_root_url( welcome: true ) }
    else
      render json: { user: @user.errors, organization: @org.errors }, status: :unprocessable_entity
    end
  end

  private

    def account_params
      params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end

    def organization_params
      params.require(:organization).permit(:name, :subdomain, :state_id, :county_id)
    end

    def form_props
      states   = select_format State.all.order(:name)
      counties = select_format County.where(state: 60).order(:name)

      {
        :resource      => @user,
        :resource_type => 'registration',
        :action        => registration_path(:user),
        :selections => {
          :states   => states,
          :counties => counties
        }
      }
    end
end
