Rails.application.routes.draw do

  get 'maps/countries'

  get 'home/show'

  devise_for :users, controllers: {registrations: 'users/registrations'}
  
  resources :users, only: [:index]

  root 'home#show'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resource :products

  # Example resource route with options:
  #   resource :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resource:
  #   resource :products do
  #     resource :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resource:
  #   resource :products do
  #     resource :comments
  #     resource :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resource :posts, concerns: :toggleable
  #   resource :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resource :products
  #   end
end
