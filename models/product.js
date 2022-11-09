const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên sản phẩm'],
        trim: true,
        maxLength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
    },
    price: {
        type: Number,
        required: [true, 'Vui lòng nhập giá sản phẩm'],
        maxLength: [20, 'Giá sản phẩm không được vượt quá 20 ký tự'],
        default: 0.0
    },
    discount: {
        type: Number,
        required: [false],
        maxLength: [20, 'Giá sản phẩm không được vượt quá 20 ký tự'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Vui lòng nhập mô tả sản phẩm'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Vui lòng chọn danh mục cho sản phẩm này'],
        enum: {
            values: [
                'cupcake',
                'redvelvet',
                'biscuit',
                'butter',
                'donut',
                'cookie'              
            ],
            message: 'Vui lòng chọn đúng danh mục cho sản phẩm'
        }
    },
    seller: {
        type: String,
        required: [false, 'Vui lòng nhập người bán sản phẩm']
    },
    stock: {
        type: Number,
        required: [true, 'Vui lòng nhập kho sản phẩm'],
        maxLength: [5, 'Nhập kho không được vượt quá 5 ký tự'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Product', productSchema);