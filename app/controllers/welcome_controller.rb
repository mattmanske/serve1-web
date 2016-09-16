class WelcomeController < ApplicationController
  def index
    render react_component: 'HelloWorld', props: { name: Rails.application.class.parent_name }
  end
end
