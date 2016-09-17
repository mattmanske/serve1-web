module ApplicationHelper

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def select_format(objects)
    objects.map { |item| { value: item.id, label: item.name } }
  end
end
