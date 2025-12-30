class Comment < ApplicationRecord
    validates :body, presence: true
    validates :body, length: { maximum: 100 }
end
