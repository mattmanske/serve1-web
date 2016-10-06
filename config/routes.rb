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

  resources :states, only: [:index], shallow: true do
    resources :counties, only: [:index] do
      resources :municipalities, only: [:index]
    end
  end

  authenticate :user do
    resources :documents
    resources :parties
    resources :jobs
    resources :cases

    resources :clients, shallow: true do
      resources :client_contacts
    end
    resources :client_contacts, only: [:index]

    resources :services, shallow: true do
      resources :affidavits
    end
    resources :affidavits, only: [:index]
  end

  authenticated :user do
    get 'dashboard/fill_data'
    get 'dashboard/clear_data'

    root :to => 'dashboard#index', :as => :organization_root
  end

  root :to => 'welcome#index'

end
