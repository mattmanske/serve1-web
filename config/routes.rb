class SubdomainConstraint
  def self.matches?(request)
    subdomains = %w{ www admin }
    request.subdomain.present? && !subdomains.include?(request.subdomain)
  end
end

Rails.application.routes.draw do

  resources :documents
  resources :affidavits
  resources :services
  resources :parties
  resources :jobs
  resources :cases
  resources :client_contacts
  resources :clients
  resources :dashboard

  devise_for :users
  root 'welcome#index'

end
