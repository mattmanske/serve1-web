Rails.application.routes.draw do

  devise_for :users, path: '',
  :path_names => {
    :sign_in       => 'login',
    :sign_out      => 'logout',
    :sign_up       => 'register',
    :registration  => 'account',
    :password      => 'user/password'
  },
  :controllers => {
    :sessions      => 'authentication',
    :registrations => 'account'
  }

  resources :counties
  resources :municipalities

  authenticate :user do
    resources :documents
    resources :affidavits
    resources :parties
    resources :jobs
    resources :cases
    resources :client_contacts
    resources :clients
    resources :services
  end

  authenticated :user do
    get 'dashboard/fill_data'
    get 'dashboard/clear_data'

    root :to => 'dashboard#index', :as => :organization_root
  end

  root :to => 'welcome#index'

end
