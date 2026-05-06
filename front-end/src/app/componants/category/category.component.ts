import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../models/category';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadAllCategory();
  }

  loadAllCategory(): void {
    this.categoryService.loadAllCategories().subscribe(
      response => (this.categories = response)
    );
  }

}
